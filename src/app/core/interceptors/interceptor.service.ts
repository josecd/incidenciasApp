import { Injectable } from "@angular/core";
import {
HttpErrorResponse,
HttpEvent,
HttpHandler,
HttpInterceptor,
HttpRequest,
HttpResponse,
} from "@angular/common/http";
import { Observable, from, throwError } from "rxjs";
import { Router } from "@angular/router";
import { catchError, map, switchMap } from "rxjs/operators";
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  key:any
  protected debug = true;
  constructor(
    private router: Router,
    private storage: Storage
  ) {

  }
  async ngOnInit() {
    this.key = await this.storage.get('key');
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return from(this.storage.get('key'))
        .pipe(
            switchMap(token => {
              if (token) {
                request = request.clone({
                  setHeaders: {
                    'Authorization': `Bearer ${token}`
                  }
                });
              }
              return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                  }
                  return event;
                }),
                catchError((error: HttpErrorResponse) => {
                  console.error(error);
                  return throwError(error);
                }));
            

            })
        );
}
}
