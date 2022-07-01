import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from '@app/models/Aluno';
import { Pedido } from '@app/models/Pedido';
import { Produto } from '@app/models/Produto';
import { AlunoService } from '@app/services/aluno.service';
import { PedidoService } from '@app/services/pedido.service';
import { ProdutoService } from '@app/services/produto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedidos-detalhe',
  templateUrl: './pedidos-detalhe.component.html',
  styleUrls: ['./pedidos-detalhe.component.scss']
})
export class PedidosDetalheComponent implements OnInit {

  form!: FormGroup;
  alunos: Aluno[] = [];
  pedido: Pedido = {} as Pedido;
  produtos: Produto[] = [];
  estadoAdicionar = true;

  get f(): any {
    return this.form.controls;
  }
  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private alunoService: AlunoService,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.iniciaFormulario();
    this.carregarPedido();
    this.carregarProdutos();
    this.carregarAlunos();
  }

  public iniciaFormulario(): void {
    this.form = this.fb.group({
      prodPedido: ['',
      Validators.required
    ],
    produto: ['',
    ],
    alunoPedido: ['',
    Validators.required
    ],
    aluno: ['',
    ],
    pagamentoPedido: [''],
    dataPedido:[''],
    plano: [''],
    quantidade: ['']
    });
  }

  public carregarPedido(): void {
    const pedidoId = this.router.snapshot.paramMap.get('id');

    if(pedidoId != null){
      this.spinner.show();

      this.estadoAdicionar = false;

      this.pedidoService.getPedidoById(+pedidoId).subscribe(
        (_pedido: Pedido) => {
          this.pedido = {... _pedido};
          this.form.patchValue(this.pedido);
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

  public carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (_produtos: Produto[]) => {
        this.produtos = _produtos
      },
      error => console.log(error)
    );
  }

  public mudaProdutoPedido(e: any){
    this.prodPedido?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  public get prodPedido() {
    return this.form.get('prodPedido');
  }

  public carregarAlunos(): void {
    this.alunoService.getAlunos().subscribe(
      (_alunos: Aluno[]) => {
        this.alunos = _alunos
      },
      error => console.log(error)
    );
  }

  public mudaAlunoPedido(e: any){
    this.alunoPedido?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  public get pagamentoPedido() {
    return this.form.get('pagamentoPedido');
  }

  public mudaPagamentoPedido(e: any){
    this.pagamentoPedido?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  public get alunoPedido() {
    return this.form.get('alunoPedido');
  }

  public cancelarPedido(): void{
    this.form.reset();
  }

  public salvarPedido(): void{
    this.spinner.show();
    if(this.form.valid){

      this.pedido = { ... this.form.value};

      this.pedido.produtoId = this.prodPedido?.value;
      this.pedido.alunoId = this.alunoPedido?.value;
      this.pedido.pagamentoId = this.pagamentoPedido?.value;

      this.pedidoService.postPedido(this.pedido).subscribe(
        () => this.toastr.success('Pedido salvo com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar pedido.', 'Error');
        },
        () => this.spinner.hide()
      );
    }else{
      this.spinner.hide();
      this.toastr.error('Prencha os campos obrigatórios.', 'Erro');
    }
  }

}
