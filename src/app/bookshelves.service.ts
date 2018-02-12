import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Bookshelf } from './bookshelf';

@Injectable()
export class BookshelvesService {
  private serverUrl = 'https://react-test-globacap.herokuapp.com';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
      .get(`${this.serverUrl}/bookshelves.json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number) {
    return this.http.get(`${this.serverUrl}/bookshelves/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  create(bookshelf: any) {
    return this.http.post(`${this.serverUrl}/bookshelves.json`, bookshelf).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, bookshelf: any) {
    return this.http.put(`${this.serverUrl}/bookshelves/${id}.json`, bookshelf).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/bookshelves/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }
}