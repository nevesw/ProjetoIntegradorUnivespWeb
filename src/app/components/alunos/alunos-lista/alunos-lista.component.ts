import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '@app/models/Professor';
import { ProfessorService } from '@app/services/professor.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from '../../../models/Aluno';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-alunos-lista',
  templateUrl: './alunos-lista.component.html',
  styleUrls: ['./alunos-lista.component.scss']
})
export class AlunosListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public alunos: Aluno[] = [];
  public alunosFiltrados: Aluno[] = [];
  public alunoId = 0;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
     this._filtroLista = value;
     this.alunosFiltrados = this.filtroLista ? this.filtrarAlunos(this.filtroLista) : this.alunos;
  }

  public filtrarAlunos(filtrarPor: string): Aluno[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.alunos.filter(
      (aluno: any) => aluno.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private alunoService: AlunoService,
    private professorService: ProfessorService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getAlunos();
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1000);
  }

  public getAlunos(): void{
    this.alunoService.getAlunos().subscribe(
      (_alunos: Aluno[]) =>{
        this.alunos = _alunos
        this.alunosFiltrados = this.alunos
      },
      error => console.log(error)
    );
  }

  getNomeProfessor(id: any): string {
    this.professorService.getProfessorById(id).subscribe(
      (_professor: Professor) => {
        return this.before(_professor.nome, ' ');
      },
      error => console.log(error)
    );
    return "Não cadastrado";
  }

  before (value: any, delimiter: any) {
    value = value || ''

    return delimiter === ''
      ? value
      : value.split(delimiter).shift()
  }

  openModal(event: any, template: TemplateRef<any>, alunoId: number): void {
    event.stopPropagation;
    this.alunoId = alunoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.alunoService.deleteAluno(this.alunoId).subscribe(
      (result: any) => {
        if(result.message === "Aluno deletado com sucesso.")  {
          this.toastr.success('O Aluno foi deletado com sucesso!', 'Deletado!');
          this.spinner.hide();
          this.getAlunos();
        }
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o aluno ${this.alunoId}`, 'Erro');
        console.error(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheAluno(id: number): void{
    this.router.navigate([`alunos/detalhe/${id}`]);
  }
}
