import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

constructor(private http: HttpClient) { }

  public getAlunos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(`${environment.api}/aluno/lista_alunos`);
  }

  public getAlunoById(id: number): Observable<Aluno>{
    return this.http.get<Aluno>(`${environment.api}/aluno/busca_aluno/${id}`);
  }

  public postAluno(aluno: Aluno): Observable<Aluno>{
    return this.http.post<Aluno>(`${environment.api}/aluno/cadastro_aluno`, aluno);
  }

  public putAluno(id: number, aluno: Aluno): Observable<Aluno>{
    return this.http.put<Aluno>(`${environment.api}/aluno/editar_aluno`, aluno);
  }

  public deleteAluno(id: number): Observable<any>{
    return this.http.delete(`${environment.api}/aluno/deletar_aluno/${id}`);
  }
}
