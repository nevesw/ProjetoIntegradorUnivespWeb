export interface AgendaAluno {
  id: number;
  data?: Date;
  horario?: Date;
  diaSemanaAulaAgendada: string;
  dataPrevistaAula?: Date;
  dataDisponivelAluno?: Date;
}
