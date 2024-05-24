import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgottenpasswordComponent } from './components/forgottenpassword/forgottenpassword.component';
import { MainComponent } from './components/main/main.component';
import { TablaUsuariosComponent } from './components/tables/tablausuarios/tablausuarios.component';
import { AddUserComponent } from './components/modals/usuarios/add-user/add-user.component';
import { TablaClientesComponent } from './components/tables/tablaclientes/tablaclientes.component';
import { TablaCuentasComponent } from './components/tables/tablacuentas/tablacuentas.component';
import { TablaTarjetasComponent } from './components/tables/tablatarjetas/tablatarjetas.component';
import { TablatransferenciasComponent } from './components/tables/tablatransferencias/tablatransferencias.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { MainclienteComponent } from './components/maincliente/maincliente.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent, data: { breadcrumb: 'Inicio' }, outlet: 'auth' },
  { path: 'landing', component: LandingpageComponent, data: { breadcrumb: 'Inicio' }, outlet: 'auth' },
  { path: 'maincliente', component: MainclienteComponent, data: { breadcrumb: 'Inicio' }, outlet: 'auth' },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Iniciar Sesión' }, outlet: 'auth' },
  { path: 'forgot', component: ForgottenpasswordComponent, data: { breadcrumb: 'Recuperar Contraseña' }, outlet: 'auth' },
  { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Registrarme' }, outlet: 'auth' },
  { path: 'main', component: MainComponent, data: { breadcrumb: 'Home' }, outlet: 'auth' },
  { path: 'usuario', component: TablaUsuariosComponent, data: { breadcrumb: 'Gestión de Usuarios' }, outlet: 'auth' },
  { path: 'cliente', component: TablaClientesComponent, data: { breadcrumb: 'Gestión de Clientes' }, outlet: 'auth' },
  { path: 'adduser', component: AddUserComponent, data: { breadcrumb: 'Agregar Usuario' }, outlet: 'auth' },
  { path: 'cuentas', component: TablaCuentasComponent, data: { breadcrumb: 'Gestión de Cuentas' }, outlet: 'auth' },
  { path: 'tarjetas', component: TablaTarjetasComponent, data: { breadcrumb: 'Gestión de Tarjetas' }, outlet: 'auth' },
  { path: 'transferencias', component: TablatransferenciasComponent, data: { breadcrumb: 'Gestión de Transferencias' }, outlet: 'auth' },
  { path: 'not-authorized', component: NotAuthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
