import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book: BookItemGoogleResponse;
  showShortDesciption = true
  //title: string = '';

  constructor(
    
    private bookService: BookService, 
    private snackBar: MatSnackBar, 
    public router: Router,  
    
  ) { }

  ngOnInit(): void {

    //this.title = this.book.
  }

  public onAdd() {
    this.bookService.addGoogleApiBook(this.book).subscribe(book => 
      this.bookService.bookList.push(book));

    this.openSnackBar(this.book.title + " was added to your library!");

  }

  public alterDescriptionText() {
     this.showShortDesciption = !this.showShortDesciption
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message);
  }

}
