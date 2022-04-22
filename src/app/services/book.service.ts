import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public addBook(newBook: Book) : void {

    this.bookList.push(newBook);
    console.log('all books: ' + this.bookList);
  }

  public generateBookID() : number {
    return this.bookList.length + 1;
  }

}
