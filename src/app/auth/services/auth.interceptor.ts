import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token:string|null=localStorage.getItem('token')
    let req=request

    if (token){
      req=request.clone({
        setHeaders:{
          authorization:`Bearer ${token}`
        }
      });
    }
    return next.handle(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
      if (err.status===401){
        this.router.navigateByUrl('/');
      }
      return throwError( err );
    }
    
    )
    );
  }
}