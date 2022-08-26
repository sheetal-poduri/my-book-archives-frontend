import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-books-google',
  templateUrl: './add-books-google.component.html',
  styleUrls: ['./add-books-google.component.css']
})
export class AddBooksGoogleComponent implements OnInit {

  public title: string = '';
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  public onSubmit(): void {
  
    console.log('title is: ' + this.title);

    this.bookService.getBooksByTitleGoogleAPI(this.title).subscribe(data => {
      this.options = data;
    });

  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();


    // this.bookService.getBooksByTitleGoogleAPI(this.title).subscribe(data => {
    //   this.options = data.items;
      
    // });
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
