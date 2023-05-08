import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { BookGoogleResponse } from '../../models/book-google-response.model';
import { BookItemGoogleResponse } from '../../models/book-item-google-response.model';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css'],
})
export class ViewBooksComponent implements OnInit {
  constructor(private bookService: BookService) {}

  public collectionBooks: BookItemGoogleResponse[] = [];
  //public displayedColumns: string[] = ['title', 'author', 'genre', 'review'];
  //public dataSource = new MatTableDataSource(this.bookList);
  //public books: Book[] = [];

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.collectionBooks = this.bookService.bookList;
    });
  }
}
