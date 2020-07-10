import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              if(error.status == 401) {
                errorMessage = "User "+ error ?.error?.email +" is not authorized."
                window.alert(errorMessage);
              }
              else if(error.status == 400) {
                errorMessage = "User credentials are not valid."
                window.alert(errorMessage);
              }
              else if(error.status == 444) {
                errorMessage = error?.error?.Message;
                window.alert(errorMessage);
              }
            }

            return throwError(errorMessage);
          })
        )
    }
   }