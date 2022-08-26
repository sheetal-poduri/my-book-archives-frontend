import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, JsonpClientBackend} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { BookGoogleResponse } from '../models/book-google-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList: Book[] = [
    {title: 'sample1', author: 'hi1', genre: 'hi2', review: 'hi3'},
    {title: 'sample2', author: 'hi1', genre: 'hi2', review: 'hi3'},
    {title: 'sample3', author: 'hi1', genre: 'hi2', review: 'hi3'},
    {title: 'sample4', author: 'hi1', genre: 'hi2', review: 'hi3'}
  ];

  constructor( private http: HttpClient ) { }

  public getAllBooks() : Observable<Book[]> {
    //console.log(this.bookList);
    return this.http.get<Book[]>("http://localhost:8081/books/getAll");
  }

  public addBook(book: Book): Observable<any> {
    console.log("inside book service method book is " + JSON.stringify(book));
    return this.http.post("http://localhost:8081/books/save", book);
  }  

  public getBooksByTitleGoogleAPI(title: string): Observable<any> {
    const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
    const authKey = '&key=AIzaSyBMWlYuZiPC98s9jnAsuwihvHH77mw0Ciw';
    return this.http.get<BookGoogleResponse>(googleUrl + title + authKey);

  }

  public generateBookID() : number {
    return this.bookList.length + 1;
  }

}
