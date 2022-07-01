import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '@app/models/Produto';
import { ProdutoService } from '@app/services/produto.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.scss']
})
export class ProdutosListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public produtos: Produto[] = [];
  public produtosFiltrados: Produto[] = [];
  public produtoId = 0;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
     this._filtroLista = value;
     this.produtosFiltrados = this.filtroLista ? this.filtrarPedidos(this.filtroLista) : this.produtos;
  }

  public filtrarPedidos(filtrarPor: string): Produto[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      (produto: any) => produto.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private produtoService: ProdutoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProdutos();
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  getProdutos(): void{
    this.produtoService.getProdutos().subscribe(
      (_produtos: Produto[]) =>{
        this.produtos = _produtos;
        this.produtosFiltrados = this.produtos;
      },
      (error: any) => console.log(error)
    );
  }

  openModal(event: any, template: TemplateRef<any>, produtoId: number): void {
    event.stopPropagation;
    this.produtoId = produtoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.produtoService.deleteProduto(this.produtoId).subscribe(
      (result: any) => {
        if(result.message === "Produto deletado com sucesso.")  {
          this.toastr.success('O Produto foi deletado com sucesso!', 'Deletado!');
          this.spinner.hide();
          this.getProdutos();
        }
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o produto ${this.produtoId}`, 'Erro');
        console.error(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheProduto(id: number): void{
    this.router.navigate([`produtos/detalhe/${id}`]);
  }

}
