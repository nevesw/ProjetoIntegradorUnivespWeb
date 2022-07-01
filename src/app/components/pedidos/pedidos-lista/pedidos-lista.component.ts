import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '@app/models/Aluno';
import { Pedido } from '@app/models/Pedido';
import { Produto } from '@app/models/Produto';
import { AlunoService } from '@app/services/aluno.service';
import { PedidoService } from '@app/services/pedido.service';
import { ProdutoService } from '@app/services/produto.service';
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
    private alunoService: AlunoService,
    private produtoService: ProdutoService,
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
      (error: any) => console.log(error),
      () => this.preencheDescricaoPedido()
    );
  }

  preencheDescricaoPedido() {
    this.pedidos.forEach(pedido => {
      console.log(pedido);
      pedido.tipoPagamento = this.getTipoPagamento(pedido.pagamentoId);
      this.alunoService.getAlunoById(pedido?.alunoId).subscribe(
        (_aluno: Aluno) => {
          pedido.aluno = _aluno;
          pedido.aluno.nome = this.before(pedido.aluno.nome, ' ');
        },
        error => console.log(error)
      );

      this.produtoService.getProdutoById(pedido?.produtoId).subscribe(
        (_produto: Produto) => {
          pedido.produto = _produto;
          pedido.descricao = this.before(pedido.produto.descricao, ' ');
        },
        error => console.log(error)
      );

    });
  }

  before (value: any, delimiter: any) {
    value = value || ''

    return delimiter === ''
      ? value
      : value.split(delimiter).shift()
  }

  getTipoPagamento(id: number): string{
    switch (id) {
      case 1:
        return 'Cartão de crédito';
      case 2:
        return 'Pix';
      case 3:
        return 'Cartão de débito';
      case 4:
        return 'Dinheiro';
      case 5:
        return 'Boleto';
      default:
          return 'Não cadastrado';
   }
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
