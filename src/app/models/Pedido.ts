import { Aluno } from "./Aluno";
import { Pagamento } from "./Pagamento";


export interface Pedido {
  id: number;
  descricao: string;
  dataPedido?: Date;
  quantidade: number;
  pagamento: Pagamento;
  aluno: Aluno;
}
