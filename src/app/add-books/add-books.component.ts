import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  public title: string = '';
  public author: string = '';
  public genre: string = '';
  public review: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }


  public onSubmit(): void {

    const newBook = new Book();

    //newBook.id = this.bookService.generateBookID();
    newBook.title = this.title;
    newBook.author = this.author;
    newBook.genre = this.genre;
    newBook.review = this.review;

    console.log('new book is: ' + newBook);

    this.bookService.addBook(newBook);

  }

  

}
