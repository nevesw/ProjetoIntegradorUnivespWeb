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

  public getProdutoById(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${environment.api}/produto/busca_produto/${id}`);
  }

  public postProduto(pedido: Produto): Observable<Produto>{
    return this.http.post<Produto>(`${environment.api}/produto/cadastro_produto`, pedido);
  }

  public deleteProduto(id: number): Observable<any>{
    return this.http.delete(`${environment.api}/produto/deletar_produto/${id}`);
  }
}
