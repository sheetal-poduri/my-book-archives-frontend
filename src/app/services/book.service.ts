import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { BookGoogleResponse } from '../models/book-google-response.model';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookList: BookItemGoogleResponse[] = [];

  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<BookItemGoogleResponse[]> {
    //console.log(this.bookList);
    return this.http.get<BookItemGoogleResponse[]>(
      'http://localhost:8081/books/getAll'
    );
  }

  public addBook(book: Book): Observable<any> {
    console.log('inside book service method book is ' + JSON.stringify(book));
    return this.http.post('http://localhost:8081/books/save', book);
  }

  public addGoogleApiBook(book: BookItemGoogleResponse): Observable<any> {
    console.log(book);
    return this.http.post(
      'http://localhost:8081/books/saveGoogleApiBook',
      book
    );
  }

  public getBooksByTitleGoogleAPI(title: string): Observable<any> {
    const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
    const authKey = '&key=AIzaSyBMWlYuZiPC98s9jnAsuwihvHH77mw0Ciw';
    return this.http.get<BookGoogleResponse>(googleUrl + title + authKey);
  }

  public getBooksByIdGoogleAPI(id: string): Observable<any> {
    const googleUrl = 'https://www.googleapis.com/books/v1/volumes/';
    return this.http.get<BookGoogleResponse>(googleUrl + id);
  }

  public getBook(title: string): Observable<BookItemGoogleResponse> {
    const book = this.bookList.find((h) => h.title === title)!;
    return of(book);
  }

  public generateBookID(): number {
    return this.bookList.length + 1;
  }
}
