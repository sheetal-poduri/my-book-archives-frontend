import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { BookGoogleResponse } from '../models/book-google-response.model';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookList: BookItemGoogleResponse[] = [];
  bookExistsinCollection: boolean;

  constructor(private http: HttpClient) {}

  // get all the books in your collection
  public getAllBooks(): Observable<BookItemGoogleResponse[]> {
    return this.http.get<BookItemGoogleResponse[]>(
      'http://localhost:8081/books/getAll'
    );
  }

  // add a book to your collection
  public addGoogleApiBook(book: BookItemGoogleResponse): Observable<any> {
    return this.http.post(
      'http://localhost:8081/books/saveGoogleApiBook',
      book
    );
  }

  // search for a book by title
  public getBooksByTitleGoogleAPI(title: string): Observable<any> {
    const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
    const authKey = '&key=AIzaSyBMWlYuZiPC98s9jnAsuwihvHH77mw0Ciw';
    return this.http.get<BookGoogleResponse>(googleUrl + title + authKey);
  }

  // search for a book by id
  public getBooksByIdGoogleAPI(id: string): Observable<any> {
    const googleUrl = 'https://www.googleapis.com/books/v1/volumes/';
    return this.http.get<BookGoogleResponse>(googleUrl + id);
  }

  // search your collection by title
  public findBookByTitle(title: string): Observable<BookItemGoogleResponse> {
    const book = this.bookList.find((h) => h.title === title)!;
    return of(book);
  }

  // search your collection by id
  public findBookByID(id: string): Observable<BookItemGoogleResponse> {
    const book = this.bookList.find((h) => h.id === id)!;
    return of(book);
  }

  // check if you have already added this book to your collection
  // need to fix this
  public checkIfBookExistsInCollection(id: string) {
    this.findBookByID(id).subscribe((book) => {
      if (book != undefined) {
        this.bookExistsinCollection = true;
      } else {
        this.bookExistsinCollection = false;
      }
    });
  }
}
