import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaAluno } from '@app/models/AgendaAluno';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aulas-lista',
  templateUrl: './aulas-lista.component.html',
  styleUrls: ['./aulas-lista.component.scss']
})
export class AulasListaComponent implements OnInit {

  public agendas: AgendaAluno[] = [];
  public agendasFiltradas: AgendaAluno[] = [];
  public agendaId = 0;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
     this._filtroLista = value;
     this.agendasFiltradas = this.filtroLista ? this.filtrarAgendas(this.filtroLista) : this.agendas;
  }

  public filtrarAgendas(filtrarPor: string): AgendaAluno[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.agendas.filter(
      (agenda: any) => agenda.diaSemanaAulaAgendada.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAgendas();
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1000);
  }

  getAgendas(){
    const agenda = {} as AgendaAluno;
    agenda.id = 1;
    agenda.data = new Date();
    agenda.horario = new Date();
    agenda.diaSemanaAulaAgendada = 'Sexta-Feira';
    agenda.professor = "Kevin";
    agenda.disponivel = "Sim";

    const agendaUm = {} as AgendaAluno;
    agendaUm.id = 1;
    agendaUm.data = new Date();
    agendaUm.horario = new Date();
    agendaUm.diaSemanaAulaAgendada = 'Sexta-Feira';
    agendaUm.professor = "Renan";
    agendaUm.disponivel = "Sim";

    const agendaDois = {} as AgendaAluno;
    agendaDois.id = 1;
    agendaDois.data = new Date();
    agendaDois.horario = new Date();
    agendaDois.diaSemanaAulaAgendada = 'Sexta-Feira';
    agendaDois.professor = "Roberto";
    agendaDois.disponivel = "Sim";

    this.agendas.push(agenda);
    this.agendas.push(agendaUm);
    this.agendas.push(agendaDois);
    console.log(this.agendas);
  }
}
