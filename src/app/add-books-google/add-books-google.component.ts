import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, filter, debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';
import { BookItemGoogleResponse } from '../models/book-item-google-response.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-books-google',
  templateUrl: './add-books-google.component.html',
  styleUrls: ['./add-books-google.component.css']
})
export class AddBooksGoogleComponent implements OnInit {

  public title: string = '';
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: any;
  isLoading = false;
  minLengthTerm = 3;
  errorMsg: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );


    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })       
    );

    // this.myControl.valueChanges
    //   .pipe(
    //     filter(res => {
    //       return res !== null && res.length >= this.minLengthTerm
    //     }),
    //     distinctUntilChanged(),
    //     debounceTime(1000),
    //     tap(() => {
    //       this.errorMsg = "";
    //       this.filteredOptions = [];
    //       this.isLoading = true;
    //     }),
    //     switchMap(value => this.bookService.getBooksByTitleGoogleAPI(value)
    //       .pipe(
    //         finalize(() => {
    //           this.isLoading = false
    //         }),
    //       )
    //     )
    //   )
    //   .subscribe((data: any) => {
    //     if (data['items'] == undefined) {
    //       this.errorMsg = data['Error'];
    //       this.filteredOptions = [];
    //     } else {
    //       this.errorMsg = "";
    //       //this.filteredOptions = data['items'];

    //       this.options = [];
    //       const searchList: BookItemGoogleResponse[] = data.items;
    //       //console.log(searchList)
    
    
    //       searchList.forEach(item => {
    //         this.options.push(item.volumeInfo.title)
    //       });
    //     }
    //     this.filteredOptions = this.options;
    //     console.log(this.filteredOptions);
    //   });
  }


  filter(val: string): Observable<any[]> {
    const filterValue = val.toLowerCase();

    // call the service which makes the http-request
    return this.bookService.getBooksByTitleGoogleAPI(filterValue)
     .pipe(
       map(response => response.items.filter(option => {
      
         return option.volumeInfo.title.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  



  private _filter(value: string): any {
    const filterValue = value.toLowerCase();



    // return this.bookService.getBooksByTitleGoogleAPI(filterValue)
    // .pipe(
    //   map(response => response.items.filter(option => { 
    //     return option.volumeInfo.title.toLowerCase().indexOf(filterValue.toLowerCase()) === 0
    //   }))
    // )

    if (filterValue.length > 1) {

      this.bookService.getBooksByTitleGoogleAPI(filterValue).subscribe(data => {

        this.options = [];
        const searchList: BookItemGoogleResponse[] = data.items;
        //console.log(searchList)
  
  
        searchList.forEach(item => {
          this.options.push(item.volumeInfo.title)
        });
  
  
        //this.options = data.items;
        console.log(this.options)
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
        
      });
    }
  
  }

}


