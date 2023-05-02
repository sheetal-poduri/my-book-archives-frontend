import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookItemGoogleResponse } from 'src/app/models/book-item-google-response.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  id: string;
  book: BookItemGoogleResponse = new BookItemGoogleResponse();
  doesExist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.bookService.getBooksByIdGoogleAPI(this.id).subscribe((response) => {
      this.book.accessInfo = response.accessInfo;
      this.book.authors = response.volumeInfo.authors;
      this.book.categories = response.volumeInfocategories;
      this.book.description = response.volumeInfo.description;
      this.book.etag = response.etag;
      this.book.id = response.id;
      this.book.kind = response.kind;
      this.book.language = response.volumeInfo.language;
      this.book.publisher = response.volumeInfo.publisher;
      this.book.publishedDate = response.volumeInfo.publishedDate;
      this.book.saleInfo = response.saleInfo;
      this.book.searchInfo = response.searchInfo;
      this.book.smallThumbnail = response.volumeInfo.imageLinks.smallThumbnail;
      this.book.thumbnail = response.volumeInfo.imageLinks.thumbnail;
      this.book.title = response.volumeInfo.title;
      this.book.volumeInfo = response.volumeInfo;
    });

    console.log(this.id);
    this.checkIfExists(this.id);
  }

  public onAdd() {
    // this.bookService
    //   .addGoogleApiBook(this.book)
    //   .subscribe((book) => this.bookService.bookList.push(book));
    // this.openSnackBar(this.book.title + ' was added to your library!');
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  // need to fix this
  checkIfExists(id: string) {
    this.bookService.checkIfBookExistsInCollection(id);
  }
}
