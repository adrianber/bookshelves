import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Book } from './book';

@Injectable()
export class BooksService {
  private serverUrl = 'https://react-test-globacap.herokuapp.com';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
      .get(`${this.serverUrl}/books.json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number) {
    return this.http.get(`${this.serverUrl}/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  create(book: any) {
    return this.http.post(`${this.serverUrl}/books.json`, book).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, book: any) {
    return this.http.put(`${this.serverUrl}/books/${id}.json`, book).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/books/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }
}