import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '@app/models/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

baseUrl = 'https://localhost:44353/api/aluno/';

constructor(private http: HttpClient) { }

  public getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl + 'lista_pedidos');
  }

  public getPedidoById(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(`${this.baseUrl}busca_pedido/${id}`);
  }

  public postPedido(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(this.baseUrl + 'cadastro_pedido', pedido);
  }

  public putPedido(id: number, pedido: Pedido): Observable<Pedido>{
    return this.http.put<Pedido>(this.baseUrl + 'editar_pedido', pedido);
  }

  public deletePedido(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}deletar_pedido/${id}`);
  }

}
