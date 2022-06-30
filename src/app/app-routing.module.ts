import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosDetalheComponent } from './components/alunos/alunos-detalhe/alunos-detalhe.component';
import { AlunosListaComponent } from './components/alunos/alunos-lista/alunos-lista.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { ProfessoresDetalheComponent } from './components/professores/professores-detalhe/professores-detalhe.component';
import { ProfessoresListaComponent } from './components/professores/professores-lista/professores-lista.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { AulasListaComponent } from './components/aulas/aulas-lista/aulas-lista.component';
import { AulasDetalheComponent } from './components/aulas/aulas-detalhe/aulas-detalhe.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosListaComponent } from './components/pedidos/pedidos-lista/pedidos-lista.component';
import { PedidosDetalheComponent } from './components/pedidos/pedidos-detalhe/pedidos-detalhe.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children:[
      {path:'login', component: LoginComponent},
      {path:'registration', component: RegistrationComponent},
    ]
  },
  {
    path:'user/perfil', component: PerfilComponent
  },
  {path: 'alunos', redirectTo: 'alunos/lista'},
  {
    path:'alunos', component: AlunosComponent,
    children: [
      {path:'lista', component: AlunosListaComponent},
      {path:'detalhe', component: AlunosDetalheComponent},
      {path:'detalhe/:id', component: AlunosDetalheComponent},
    ]
  },
  {path: 'professores', redirectTo: 'professores/lista'},
  {
    path:'professores', component: ProfessoresComponent,
    children: [
      {path:'lista', component: ProfessoresListaComponent},
      {path:'detalhe', component: ProfessoresDetalheComponent},
      {path:'detalhe/:id', component: ProfessoresDetalheComponent},
    ]
  },
  {path:'aulas', redirectTo: 'aulas/lista'},
  {
    path:'aulas', component: AulasComponent,
    children: [
      {path:'lista', component: AulasListaComponent},
      {path:'detalhe', component: AulasDetalheComponent},
      {path:'detalhe/:id', component: AulasDetalheComponent},
    ]
  },
  {path:'pedidos', redirectTo: 'pedidos/lista'},
  {
    path:'pedidos', component: PedidosComponent,
    children: [
      {path:'lista', component: PedidosListaComponent},
      {path:'detalhe', component: PedidosDetalheComponent},
      {path:'detalhe/:id', component: PedidosDetalheComponent},
    ]
  },
  {path:'', redirectTo: 'user/login', pathMatch: 'full'},
  {path:'**', redirectTo: 'user/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
