import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {


  @Input() book: BookItemGoogleResponse;
  
  constructor(

    private bookService: BookService, 
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookService.bookList = data;
      this.getBook();

    });
  }


  getBook(): void {
    const title = this.route.snapshot.paramMap.get('title');
    this.bookService.getBook(title)
      .subscribe(book => this.book = book);
  }



}
