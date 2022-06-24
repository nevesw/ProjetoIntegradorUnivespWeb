export interface AgendaProfessor {
  id: number;
  dataAgendada?: Date;
  horarioAgendado?: Date;
  diaSemanaAulaAgendada: string;
  dataPrevistaAula?: Date;
  dataDisponivelProfessor?: Date;
}
