import { AgendaProfessor } from "./AgendaProfessor";
import { Aluno } from "./Aluno";

export interface Professor {
  id: number;
  nome: string;
  email: string;
  dataCriacao?: Date;
  status: string;
  cnpj: string;
  numeroCelular: string;
  dataNascimento?: Date;
  usuarioPlataforma: string;
  senhaPlataforma: string;
  cpf: string;
  rg: string;
  alunos: Aluno[];
  agendaProfessorId: number;
  agendaProfessor: AgendaProfessor;
}
