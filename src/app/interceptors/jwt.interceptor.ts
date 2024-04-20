import { Injectable } from "@angular/core";
import { AutenticarHelper } from "../helpers/autenticar.helper";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private autenticarHelper: AutenticarHelper
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //verificando se a chamada feita pelo HttpClient
        if(req.url.includes("/book")) {

            //Capturar o Token gravado na localstorage
            let accessToken = this.autenticarHelper.getData()?.accessToken;

            //Adicionar o token no cabeçalho da requisição da API
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }

        //liberando a requisição
        return next.handle(req);
    }
}