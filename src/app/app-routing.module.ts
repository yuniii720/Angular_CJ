import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgottenpasswordComponent } from './components/forgottenpassword/forgottenpassword.component';
import { MainComponent } from './components/main/main.component';
import { TablaUsuariosComponent } from './components/tables/tablausuarios/tablausuarios.component';
import { AddUserComponent } from './components/modals/usuarios/add-user/add-user.component';
import { TablaClientesComponent } from './components/tables/tablaclientes/tablaclientes.component';
import { TablaCuentasComponent } from './components/tables/tablacuentas/tablacuentas.component';
import { TablatarjetasComponent } from './components/tables/tablatarjetas/tablatarjetas.component';
import { TablatransferenciasComponent } from './components/tables/tablatransferencias/tablatransferencias.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    outlet: 'auth'
  },
  {
    path: 'login',
    component: LoginComponent,
    outlet: 'auth'
  },
  {
    path: 'forgot',
    component: ForgottenpasswordComponent,
    outlet: 'auth'
  },
  {
    path: 'register',
    component: RegisterComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'forgot',
    component: ForgottenpasswordComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'usuario',
    component: TablaUsuariosComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'cliente',
    component: TablaClientesComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'adduser',
    component: AddUserComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'Cuentas',
    component: TablaCuentasComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'Tarjetas',
    component: TablatarjetasComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'Transferencias',
    component: TablatransferenciasComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


