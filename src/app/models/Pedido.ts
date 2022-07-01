import { Aluno } from "./Aluno";
import { Pagamento } from "./Pagamento";
import { Produto } from "./Produto";


export interface Pedido {
  id: number;
  descricao: string;
  dataPedido?: Date;
  quantidade: number;
  pagamentoId: number;
  alunoId: number;
  produtoId: number;
  pagamento: Pagamento;
  aluno: Aluno;
  produto: Produto;
  tipoPagamento: string;
}
