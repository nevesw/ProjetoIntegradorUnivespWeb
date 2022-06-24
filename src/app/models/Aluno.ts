import { AgendaAluno } from "./AgendaAluno";
import { Endereco } from "./Endereco";
import { Pagamento } from "./Pagamento";
import { Professor } from "./Professor";

export interface Aluno {
   id: number;
   nome: string;
   email: string;
   dataCriacao?: Date;
   statusPagamento: string;
   dataUltimoPagamento?: Date;
   dataNascimento?: Date;
   nacionalidade: string;
   dataVencimento?: Date;
   numeroCelular: string;
   cpf: string;
   rg: string;
   professorId?: number;
   professor: Professor;
   pagamentoId?: number;
   pagamento: Pagamento;
   enderecoId?: number;
   endereco: Endereco;
   agendaAlunoId?: number;
   agendaAluno: AgendaAluno;
   nomeProfessor: string;
   dataAula?: Date;
}
