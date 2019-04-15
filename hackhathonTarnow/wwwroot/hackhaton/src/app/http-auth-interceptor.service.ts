import { Observable, Subject } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

export class HttpAuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");
    const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    
    return next.handle(clonedRequest);
  }
}
