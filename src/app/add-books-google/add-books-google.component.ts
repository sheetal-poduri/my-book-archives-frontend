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
  submitClicked = false;
  searchedBook: BookItemGoogleResponse;


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
    const newBook = new BookItemGoogleResponse;
    //console.log(book);

    newBook.accessInfo = book.accessInfo;
    newBook.etag = book.etag;
    newBook.id = book.id;
    newBook.kind = book.kind;
    newBook.saleInfo = book.saleInfo;
    newBook.searchInfo = book.searchInfo;
    newBook.volumeInfo.title = book.volumeInfo.title;
    newBook.volumeInfo.publisher = book.volumeInfo.publisher;
    newBook.volumeInfo.language = book.volumeInfo.language;
    //newBook.volumeInfo.imageLinks = book.volumeInfo.imageLinks;
    newBook.volumeInfo.description = book.volumeInfo.description;
    newBook.volumeInfo.categories = book.volumeInfo.categories;
    newBook.volumeInfo.authors = book.volumeInfo.authors;
    newBook.volumeInfo.imageLinks.thumbnail = book.volumeInfo.imageLinks.thumbnail;
    newBook.volumeInfo.imageLinks.smallThumbnail = book.volumeInfo.imageLinks.smallThumbnail;

    console.log(newBook);
    this.searchedBook = newBook;
    this.submitClicked = true;

   }


   getOptionText(option: BookItemGoogleResponse) : string {
    return option.volumeInfo.title;
   }

}


