import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '@app/models/Produto';
import { ProdutoService } from '@app/services/produto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produtos-detalhe',
  templateUrl: './produtos-detalhe.component.html',
  styleUrls: ['./produtos-detalhe.component.scss']
})
export class ProdutosDetalheComponent implements OnInit {

  form!: FormGroup;
  produtos: Produto[] = [];
  produto: Produto = {} as Produto;
  estadoAdicionar = true;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.iniciaFormulario();
    this.carregarProdutos();

  }

  public iniciaFormulario(): void {
    this.form = this.fb.group({
      codProduto: [''],
      descricao: [''],
      quantidade: [''],
      precoVenda: [''],
      plano: ['']
    });
  }


  public carregarProdutos(): void {
    const produtoId = this.router.snapshot.paramMap.get('id');

    if(produtoId != null){
      this.spinner.show();

      this.estadoAdicionar = false;

      this.produtoService.getProdutoById(+produtoId).subscribe(
        (_produto: Produto) => {
          this.produto = {... _produto};
          this.form.patchValue(this.produto);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar pedido.','Erro.');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  public cancelarProduto(): void{
    this.form.reset();
  }

  public salvarProduto(): void{
    this.spinner.show();
    if(this.form.valid){

      this.produto = { ... this.form.value};

      this.produtoService.postProduto(this.produto).subscribe(
        () => this.toastr.success('Produto salvo com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar produto.', 'Error');
        },
        () => this.spinner.hide()
      );
    }else{
      this.spinner.hide();
      this.toastr.error('Prencha os campos obrigatórios.', 'Erro');
    }
  }

}
