import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.authorization_token) {
            request = request.clone({
                setHeaders: {
                    'X-Auth-Token': `${currentUser.authorization_token}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        return next.handle(request);
    }
}