import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, filter, debounceTime, distinctUntilChanged, finalize, switchMap, tap, catchError, of } from 'rxjs';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-books-google',
  templateUrl: './add-books-google.component.html',
  styleUrls: ['./add-books-google.component.css']
})
export class AddBooksGoogleComponent implements OnInit {

  public title: string = '';
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: any;
  isLoading = false;
  minLengthTerm = 3;
  errorMsg: string;


  constructor(private bookService: BookService) { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })       
    );
  }


  filter(val: string): Observable<any[]> {
    //const filterValue = val.toLowerCase();
    //this.filteredOptions = [];
    // call the service which makes the http-request
    return this.bookService.getBooksByTitleGoogleAPI(val)
     .pipe(
       map(response => response.items.filter(option => {
      
         return option.volumeInfo.title.toLowerCase().indexOf(val.toString().toLowerCase()) === 0
       }))
       //,catchError(err => of('error', err))
     )
   }  

   viewBook(book) {
    const searchedBook = new BookItemGoogleResponse;
    //console.log(book);

    searchedBook.accessInfo = book.accessInfo;
    searchedBook.etag = book.etag;
    searchedBook.id = book.id;
    searchedBook.kind = book.kind;
    searchedBook.saleInfo = book.saleInfo;
    searchedBook.searchInfo = book.searchInfo;
    searchedBook.volumeInfo.title = book.volumeInfo.title;
    searchedBook.volumeInfo.publisher = book.volumeInfo.publisher;
    searchedBook.volumeInfo.language = book.volumeInfo.language;
    searchedBook.volumeInfo.imageLinks = book.volumeInfo.imageLinks;
    searchedBook.volumeInfo.description = book.volumeInfo.description;
    searchedBook.volumeInfo.categories = book.volumeInfo.categories;
    searchedBook.volumeInfo.authors = book.volumeInfo.authors;

    console.log(searchedBook);

   }


   getOptionText(option: BookItemGoogleResponse) : string {
    return option.volumeInfo.title;
   }

}


