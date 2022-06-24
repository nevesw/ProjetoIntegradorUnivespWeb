import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '@app/models/Aluno';
import { Professor } from '@app/models/Professor';
import { AlunoService } from '@app/services/aluno.service';
import { ProfessorService } from '@app/services/professor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.scss']
})
export class AlunosDetalheComponent implements OnInit {

  // Nomes Professores
  Profs:  Professor[] = [];
  nomeProfessorSelecionado: string = '';
  form!: FormGroup;
  aluno: Aluno = {} as Aluno;
  estadoAdicionar = true;
  get f(): any {
    return this.form.controls;
  }


  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private rota: Router,
    private alunoService: AlunoService,
    private professorService: ProfessorService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  public carregarAluno(): void{
    const alunoIdParam = this.router.snapshot.paramMap.get('id');


    if(alunoIdParam != null){
      this.spinner.show();

      this.estadoAdicionar = false;

      this.alunoService.getAlunoById(+alunoIdParam).subscribe(
          (aluno: Aluno) => {
            this.aluno = {... aluno};
            this.form.patchValue(this.aluno);
          },
          (error: any) => {
            this.spinner.hide();
            this.toastr.error('Erro ao tentar carregar Aluno.','Erro.');
            console.error(error);
          },
          () => this.spinner.hide(),
      );
    }

  }

  public carregarProfessores(): void {
    this.professorService.getProfessores().subscribe(
      (_professores: Professor[]) =>{
        this.Profs = _professores
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.carregarProfessores();
    this.carregarAluno();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['',
      Validators.required
    ],
    professor: ['',
    ],
    profNome: ['',
    Validators.required
    ],
    email: [''],
    rg:[''],
    numeroCelular: [''],
    statusPagamento: [''],
      cpf: ['',
      Validators.required
    ],
    dataUltimoPagamento: [''],
    dataVencimento:[''],
    nacionalidade: [''],
    dataAula:['',
    Validators.required
    ]
    });
  }

  public mudaProfessor(e: any){
    //alert(JSON.stringify(this.form.value));
    this.profNome?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  public get profNome() {
    return this.form.get('profNome');
  }
  public get dataAula() {
    return this.form.get('dataAula');
  }

  public cancelarAluno(): void{
    this.form.reset();
  }
  public salvarAluno(): void{
    this.spinner.show();
    if(this.form.valid){

      this.aluno = { ... this.form.value};
      //colocar lista checkbox professores
      //this.aluno.professorId = 1; // getIdProfessorByName();

      this.aluno.nomeProfessor = this.profNome?.value;
      this.aluno.dataAula = this.dataAula?.value;
      this.alunoService.postAluno(this.aluno).subscribe(
        () => this.toastr.success('Aluno salvo com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          if(error = 'erro prof'){
            this.spinner.hide();
            this.toastr.error('Erro, Horário professor não  disponivel.', 'Escolha outro professor');
          }else{
            this.spinner.hide();
            this.toastr.error('Erro ao salvar aluno.', 'Error');
          }
        },
        () => this.spinner.hide()
      );
    }else{
      this.spinner.hide();
      this.toastr.error('Prencha os campos obrigatórios.', 'Erro');
    }
  }


}
