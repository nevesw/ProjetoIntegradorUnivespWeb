import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '@app/models/Produto';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public getProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(
      `${environment.api}/produto/lista_produtos`
      );
  }

}
