import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertyfyService } from "./alertyfy.service";


@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor{
    constructor(private alertify: AlertyfyService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) { //: Observable<HttpEvent<any>>
        console.log("Http interceptor");
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse)=>{
                const errorMessage = this.setError(error);
                console.log(error);
                this.alertify.error(errorMessage);
                return throwError(errorMessage);

            })
        );
    }

    setError(error: HttpErrorResponse): string{
        let errorMessage ='Unknown error occured';
        if(error.error instanceof ErrorEvent){
            errorMessage = error.error.message;
        }else{
            if(error.status !==0){
                errorMessage=error.error.errorMessage
            }
        }
        return errorMessage;

    }
}