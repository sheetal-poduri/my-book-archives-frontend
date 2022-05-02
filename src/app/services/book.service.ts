import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, JsonpClientBackend} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

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

  // public addBook(newBook: Book) : void {

  //   this.bookList.push(newBook);
  //   console.log('all books: ' + JSON.stringify(this.bookList));

  //   return this.http.post
  // }

  public addBook(book: Book): Observable<any> {
    console.log("inside book service method book is " + JSON.stringify(book));
    return this.http.post("http://localhost:8081/books/save", book);
  }

  public handleError(book: Book): (err: any, caught: Observable<Book>) => import("rxjs").ObservableInput<any> {
    throw new Error('Could not add ' + book.title);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  
  //     return of(result as T);
  //   };
  // }
  

  public generateBookID() : number {
    return this.bookList.length + 1;
  }

}
