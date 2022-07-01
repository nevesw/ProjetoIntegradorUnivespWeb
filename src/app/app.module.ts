import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared//titulo/titulo.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { ProfessoresComponent } from './components/professores/professores.component';



import { AlunoService } from './services/aluno.service';
import { ProfessorService } from './services/professor.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { AulasComponent } from './components/aulas/aulas.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { AlunosDetalheComponent } from './components/alunos/alunos-detalhe/alunos-detalhe.component';
import { AlunosListaComponent } from './components/alunos/alunos-lista/alunos-lista.component';
import { ProfessoresDetalheComponent } from './components/professores/professores-detalhe/professores-detalhe.component';
import { ProfessoresListaComponent } from './components/professores/professores-lista/professores-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AulasListaComponent } from './components/aulas/aulas-lista/aulas-lista.component';
import { AulasDetalheComponent } from './components/aulas/aulas-detalhe/aulas-detalhe.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosDetalheComponent } from './components/pedidos/pedidos-detalhe/pedidos-detalhe.component';
import { PedidosListaComponent } from './components/pedidos/pedidos-lista/pedidos-lista.component';
import { ProdutosListaComponent } from './components/produtos/produtos-lista/produtos-lista.component';
import { ProdutosDetalheComponent } from './components/produtos/produtos-detalhe/produtos-detalhe.component';
import { ProdutosComponent } from './components/produtos/produtos.component';




@NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      AlunosComponent,
      AlunosDetalheComponent,
      AlunosListaComponent,
      ProfessoresComponent,
      ProfessoresDetalheComponent,
      ProfessoresListaComponent,
      DateTimeFormatPipe,
      AulasComponent,
      AulasListaComponent,
      AulasDetalheComponent,
      PerfilComponent,
      TituloComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      PedidosComponent,
      PedidosDetalheComponent,
      PedidosListaComponent,
      ProdutosComponent,
      ProdutosListaComponent,
      ProdutosDetalheComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AlunoService,
    ProfessorService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
