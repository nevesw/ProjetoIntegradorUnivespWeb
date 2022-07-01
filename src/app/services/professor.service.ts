import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '@app/models/Professor';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProfessorService {


constructor(private http: HttpClient) { }

  public getProfessores(): Observable<Professor[]>{
    return this.http.get<Professor[]>(`${environment.api}/professor/lista_professores`);
  }

  public getProfessorById(id?: number): Observable<Professor>{
    return this.http.get<Professor>(`${environment.api}/professor/busca_professor/${id}`);
  }

  public postProfessor(professor: Professor): Observable<Professor>{
    return this.http.post<Professor>(`${environment.api}/professor/cadastro_professor`, professor);
  }

  public putProfessor(id: number, professor: Professor): Observable<Professor>{
    return this.http.put<Professor>(`${environment.api}/professor/editar_professor`, professor);
  }

  public deleteProfessor(id: number): Observable<any>{
    return this.http.delete(`${environment.api}/professor/deletar_professor/${id}`);
  }
}
