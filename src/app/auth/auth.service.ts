import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  loginUrl = "https://react-test-globacap.herokuapp.com/login.json";

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    //GET method retrives 401 because the body is not posted to the server
    let req = new HttpRequest('GET', `${this.loginUrl}?user=${user}&password=${password}`, "",  {headers: headers });

    return this.http.request(req);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}