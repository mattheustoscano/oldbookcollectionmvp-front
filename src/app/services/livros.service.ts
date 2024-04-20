import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CadastrarLivrosRequest } from "../models/cadastrar-livros.request.model";
import { EditarLivrosRequest } from "../models/editar-livros.request.model";
import { ConsultarLivros } from "../models/consultar-livros.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LivrosService {

    uri: string = environment.apiLivros + "/book";

    constructor(
        private httpClient: HttpClient
    ) {
    }

    post(request: CadastrarLivrosRequest): Observable<ConsultarLivros> {
        return this.httpClient.post<ConsultarLivros>(this.uri + "/post", request);
    }

    put(request: EditarLivrosRequest): Observable<ConsultarLivros> {
        return this.httpClient.put<ConsultarLivros>(this.uri + "/put/" + request.id , request);
    }

    delete(idLivro: string): Observable<ConsultarLivros> {
        return this.httpClient.delete<ConsultarLivros>(this.uri + "/delete/" + idLivro);
    }

    getAll(): Observable<ConsultarLivros[]> {
        return this.httpClient.get<ConsultarLivros[]>(this.uri + "/getall");
    }

    getById(idLivro: string): Observable<ConsultarLivros> {
        return this.httpClient.get<ConsultarLivros>(this.uri + "/getbyid/" + idLivro);
    }

}