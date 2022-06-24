import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '@app/models/Professor';
import { ProfessorService } from '@app/services/professor.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-professores-lista',
  templateUrl: './professores-lista.component.html',
  styleUrls: ['./professores-lista.component.scss']
})
export class ProfessoresListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public professores: Professor[] = [];
  public professoresFiltrados: Professor[] = [];
  public professorId = 0;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
     this._filtroLista = value;
     this.professoresFiltrados = this.filtroLista ? this.filtrarProfessores(this.filtroLista) : this.professores;
  }

  public filtrarProfessores(filtrarPor: string): Professor[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.professores.filter(
      (professor: any) => professor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private professorService: ProfessorService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.getProfessores();
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  public getProfessores(): void{
    this.professorService.getProfessores().subscribe(
      (_professores: Professor[]) =>{
        this.professores = _professores
        this.professoresFiltrados = this.professores
      },
      error => console.log(error)
    );
  }

  openModal(event: any, template: TemplateRef<any>, professorId: number): void {
    event.stopPropagation;
    this.professorId = professorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.professorService.deleteProfessor(this.professorId).subscribe(
      (result: any) => {
        if(result.message === "Professor deletado com sucesso.")  {
          this.toastr.success('O Professor foi deletado com sucesso!', 'Deletado!');
          this.spinner.hide();
          this.getProfessores();
        }
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o professor ${this.professorId}`, 'Erro');
        console.error(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheProfessor(id: number): void{
    this.router.navigate([`professores/detalhe/${id}`]);
  }
}
