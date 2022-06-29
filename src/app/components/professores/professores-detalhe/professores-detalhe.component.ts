import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Professor } from '@app/models/Professor';
import { ProfessorService } from '@app/services/professor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-professores-detalhe',
  templateUrl: './professores-detalhe.component.html',
  styleUrls: ['./professores-detalhe.component.scss']
})
export class ProfessoresDetalheComponent implements OnInit {

  form!: FormGroup;
  professor: Professor = {} as Professor;
  estadoAdicionar = true;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private professorService: ProfessorService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.iniciaFormulario();
    this.carregarProfessor();
  }

  public iniciaFormulario(): void {
    this.form = this.fb.group({
      nome: [''],
    email: [''],
    status: ['',],
    cnpj: [''],
    dataInicio:[''],
    numeroCelular: [''],
    usuarioPlataforma: [''],
    cpf: [''],
    });
  }

  public carregarProfessor(): void{
    const professorIdParam = this.router.snapshot.paramMap.get('id');


    if(professorIdParam != null){
      this.spinner.show();

      this.estadoAdicionar = false;

      this.professorService.getProfessorById(+professorIdParam).subscribe(
          (prof: Professor) => {
            this.professor = {... prof};
            this.form.patchValue(this.professor);
          },
          (error: any) => {
            this.spinner.hide();
            this.toastr.error('Erro ao tentar carregar Professor.','Erro.');
            console.error(error);
          },
          () => this.spinner.hide(),
      );
    }
  }

  public cancelarProfessor(): void{
    this.form.reset();
  }
  public salvarProfessor(): void{
    this.spinner.show();
    if(this.form.valid){

      this.professor = { ... this.form.value};

      this.professorService.postProfessor(this.professor).subscribe(
        () => this.toastr.success('Professor salvo com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar professor.', 'Error');
        },
        () => this.spinner.hide()
      );
    }else{
      this.spinner.hide();
      this.toastr.error('Prencha os campos obrigatórios.', 'Erro');
    }
  }
}
