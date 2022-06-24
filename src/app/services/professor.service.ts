import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '@app/models/Professor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProfessorService {

baseUrl = 'https://localhost:44353/api/professor/';
constructor(private http: HttpClient) { }

  public getProfessores(): Observable<Professor[]>{
    return this.http.get<Professor[]>(this.baseUrl + 'lista_professores');
  }

  public getProfessorById(id: number): Observable<Professor>{
    return this.http.get<Professor>(`${this.baseUrl}busca_professor/${id}`);
  }

  public postProfessor(professor: Professor): Observable<Professor>{
    return this.http.post<Professor>(this.baseUrl + 'cadastro_professor', professor);
  }

  public putProfessor(id: number, professor: Professor): Observable<Professor>{
    return this.http.put<Professor>(this.baseUrl + 'editar_professor', professor);
  }

  public deleteProfessor(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}deletar_professor/${id}`);
  }
}
