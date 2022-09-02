import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book: BookItemGoogleResponse;
  //title: string = '';

  constructor(private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    //this.title = this.book.
  }

  onAdd() {
    this.bookService.addGoogleApiBook(this.book).subscribe(book => 
      this.bookService.bookList.push(book));

    this.openSnackBar(this.book.title + " was added to your library!");

  }

  private openSnackBar(message: string) {
    this.snackBar.open(message);
  }

}
