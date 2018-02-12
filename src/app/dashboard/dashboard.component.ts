import { Component, OnInit } from '@angular/core';

import { BookshelvesService } from '../bookshelves.service';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model: any = {};
  bookshelves: any;
  books: any;
  bookshelfLoading = false;
  bookLoading = false;

  constructor(private bookshelvesService: BookshelvesService,
    private booksService: BooksService) { }

  ngOnInit() {
    this.loadAllBookshelves();
    this.loadAllBooks();
  }

  deleteBookshelv(id: number) {
    this.bookshelvesService.delete(id).subscribe(() => { this.loadAllBookshelves() });
  }

  private loadAllBookshelves() {
    this.bookshelvesService.getAll().subscribe(bookshelves => { this.bookshelves = bookshelves; });
  }

  deleteBook(id: number) {
    this.booksService.delete(id).subscribe(() => { this.loadAllBooks() });
  }

  private loadAllBooks() {
    this.booksService.getAll().subscribe(books => { this.books = books; });
  }

  addBookshelf() {
    this.bookshelfLoading = true;
    this.bookshelvesService.create({ "bookshelf": { title: this.model.bookshelfTitle } }).subscribe(
      data => {
        this.loadAllBookshelves();
        this.bookshelfLoading = false;
      },
      error => {
        window.alert("ERROR: Bookshelf not added");
        this.bookshelfLoading = false;
      });
  }

  addBook() {
    this.bookLoading = true;
    this.booksService.create({
      "book": {
        title: this.model.bookTitle,
        author: this.model.author,
        isbn: this.model.isbn,
        bookshelf_id: this.model.bookshelfId
      }
    }).subscribe(
      data => {
        this.loadAllBooks();
        this.bookLoading = false;
      },
      error => {
        window.alert("ERROR: Book not added");
        this.bookLoading = false;
      });
  }

}
