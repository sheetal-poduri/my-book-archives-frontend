import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  startWith,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
  tap,
  catchError,
  of,
} from 'rxjs';
import { BookItemGoogleResponse } from '../../models/book-item-google-response.model';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css'],
})
export class SearchBooksComponent implements OnInit {
  public title: string = '';
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: any;
  isLoading = false;
  minLengthTerm = 3;
  errorMsg: string;
  submitClicked = false;
  searchedBook: BookItemGoogleResponse;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val || '');
      })
    );
  }

  filter(val: string): Observable<any[]> {
    //const filterValue = val.toLowerCase();
    //this.filteredOptions = [];
    // call the service which makes the http-request
    return this.bookService.getBooksByTitleGoogleAPI(val).pipe(
      map((response) =>
        response.items.filter((option) => {
          return (
            option.volumeInfo.title
              .toLowerCase()
              .indexOf(val.toString().toLowerCase()) === 0
          );
        })
      )
      //,catchError(err => of('error', err))
    );
  }

  viewBook(book) {
    const newBook = new BookItemGoogleResponse();
    //console.log(book);

    newBook.accessInfo = book.accessInfo;
    newBook.etag = book.etag;
    newBook.id = book.id;
    newBook.kind = book.kind;
    newBook.saleInfo = book.saleInfo;
    newBook.searchInfo = book.searchInfo;
    newBook.title = book.volumeInfo.title;
    newBook.publisher = book.volumeInfo.publisher;
    newBook.language = book.volumeInfo.language;
    //newBook.volumeInfo.imageLinks = book.volumeInfo.imageLinks;
    newBook.description = book.volumeInfo.description;
    newBook.categories = book.volumeInfo.categories;
    newBook.authors = book.volumeInfo.authors;
    newBook.thumbnail = book.volumeInfo.imageLinks.thumbnail;
    newBook.smallThumbnail = book.volumeInfo.imageLinks.smallThumbnail;

    //console.log(newBook);
    this.searchedBook = newBook;
    this.submitClicked = true;
    this.router.navigate(['/detail', newBook.id]);
  }

  getOptionText(option: any): string {
    return option.volumeInfo.title;
  }
}
