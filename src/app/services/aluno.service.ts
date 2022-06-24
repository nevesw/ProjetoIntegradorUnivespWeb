import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

baseUrl = 'https://localhost:44353/api/aluno/';

constructor(private http: HttpClient) { }

  public getAlunos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.baseUrl + 'lista_alunos');
  }

  public getAlunoById(id: number): Observable<Aluno>{
    return this.http.get<Aluno>(`${this.baseUrl}busca_aluno/${id}`);
  }

  public postAluno(aluno: Aluno): Observable<Aluno>{
    return this.http.post<Aluno>(this.baseUrl + 'cadastro_aluno', aluno);
  }

  public putAluno(id: number, aluno: Aluno): Observable<Aluno>{
    return this.http.put<Aluno>(this.baseUrl + 'editar_aluno', aluno);
  }

  public deleteAluno(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}deletar_aluno/${id}`);
  }
}
