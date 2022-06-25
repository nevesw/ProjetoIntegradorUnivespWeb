import { Aluno } from "./Aluno";
import { Pagamento } from "./Pagamento";
import { Produto } from "./Produto";


export interface Pedido {
  id: number;
  descricao: string;
  dataPedido?: Date;
  quantidade: number;
  pagamento: Pagamento;
  aluno: Aluno;
  produto: Produto;
}
