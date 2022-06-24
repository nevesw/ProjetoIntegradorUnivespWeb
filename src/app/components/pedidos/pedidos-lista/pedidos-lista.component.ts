import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '@app/models/Pedido';
import { PedidoService } from '@app/services/pedido.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.scss']
})
export class PedidosListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public pedidos: Pedido[] = [];
  public pedidosFiltrados: Pedido[] = [];
  public pedidoId = 0;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
     this._filtroLista = value;
     this.pedidosFiltrados = this.filtroLista ? this.filtrarPedidos(this.filtroLista) : this.pedidos;
  }

  public filtrarPedidos(filtrarPor: string): Pedido[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.pedidos.filter(
      (pedido: any) => pedido.aluno.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private pedidoService: PedidoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPedidos();
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1000);
  }

  getPedidos(): void{
    this.pedidoService.getPedidos().subscribe(
      (_pedidos: Pedido[]) =>{
        this.pedidos = _pedidos;
        this.pedidosFiltrados = this.pedidos;
      },
      (error: any) => console.log(error)
    );
  }

  openModal(event: any, template: TemplateRef<any>, pedidoId: number): void {
    event.stopPropagation;
    this.pedidoId = pedidoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.pedidoService.deletePedido(this.pedidoId).subscribe(
      (result: any) => {
        if(result.message === "Pedido deletado com sucesso.")  {
          this.toastr.success('O Pedido foi deletado com sucesso!', 'Deletado!');
          this.spinner.hide();
          this.getPedidos();
        }
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o pedido ${this.pedidoId}`, 'Erro');
        console.error(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalhePedido(id: number): void{
    this.router.navigate([`pedidos/detalhe/${id}`]);
  }

}
