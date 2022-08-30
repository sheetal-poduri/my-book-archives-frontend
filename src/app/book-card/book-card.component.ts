import { Component, Input, OnInit } from '@angular/core';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book: BookItemGoogleResponse;
  //title: string = '';

  constructor() { }

  ngOnInit(): void {

    //this.title = this.book.
  }

}
