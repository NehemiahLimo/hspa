import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retryWhen } from "rxjs/operators";
import { ErrorCodes } from "../enums/enums";
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
            retryWhen(error=>this.retryRequest(error, 10)),
            catchError((error: HttpErrorResponse)=>{
                const errorMessage = this.setError(error);
                console.log(error);
                this.alertify.error(errorMessage);
                return throwError(errorMessage);

            })
        );
    }

    retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown>
    {
        return error.pipe(
            concatMap((chckError: HttpErrorResponse, count: number)=>{

                if(count<=retryCount){
                    switch(chckError.status){
                        case ErrorCodes.serverDown:
                            return of(chckError);
                            
                        // case ErrorCodes.unauthorized:
                        //     return of(chckError);
                    }
                }
               
                return throwError(chckError)
            })
        )
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