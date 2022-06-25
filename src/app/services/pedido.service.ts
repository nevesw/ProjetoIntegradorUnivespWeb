import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '@app/models/Pedido';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {


constructor(private http: HttpClient) { }

  public getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${environment.api}/pedido/lista_pedidos`);
  }

  public getPedidoById(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(`${environment.api}/pedido/busca_pedido/${id}`);
  }

  public postPedido(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(`${environment.api}/pedido/cadastro_pedido`, pedido);
  }

  public putPedido(id: number, pedido: Pedido): Observable<Pedido>{
    return this.http.put<Pedido>(`${environment.api}/pedido/editar_pedido`, pedido);
  }

  public deletePedido(id: number): Observable<any>{
    return this.http.delete(`${environment.api}/pedido/deletar_pedido/${id}`);
  }

}
