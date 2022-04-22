import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {

  constructor(private bookService: BookService) { }

  public bookList: Book[] = [];
  public displayedColumns: string[] = ['title', 'author', 'genre', 'review'];
  public dataSource = new MatTableDataSource(this.bookList);
  //public books: Book[] = [];

  ngOnInit(): void {

    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
      this.dataSource = new MatTableDataSource(this.bookList);

    });
    //this.bookList = this.bookService.getAllBooks();
    //console.log(this.bookList);
    //this.dataSource = new MatTableDataSource(this.bookList);
  }

  ngDoCheck() {

    // this.bookService.getAllBooks().subscribe(data => {
    //   this.bookList = data;
    //   this.dataSource = new MatTableDataSource(this.bookList);

    // });

    //this.bookList = this.bookService.getAllBooks();
    //console.log(this.bookList);
    //this.dataSource = new MatTableDataSource(this.bookList);
  }

  public onClickViewAll(): void {
    //  this.bookService.getAllBooks().subscribe(data => {
    //    this.bookList = data;
    //    this.dataSource = new MatTableDataSource(this.bookList);

    // });

    //this.bookList = this.bookService.getAllBooks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
