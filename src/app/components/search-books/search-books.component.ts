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
      switchMap((val) => (val.length >= 2 ? this.filter(val) : []))
    );
  }

  filter(val: string): Observable<any[]> {
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
    this.router.navigate(['/detail', book.id]);
  }

  getOptionText(option: any): string {
    return option.volumeInfo.title;
  }
}
