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
import { RoleGuardComponent } from './components/role-guard/role-guard.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent, data: { breadcrumb: 'Inicio' }, outlet: 'auth' },
  { path: 'landing', component: LandingpageComponent, data: { breadcrumb: 'Inicio' }, outlet: 'auth' },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Iniciar Sesión' }, outlet: 'auth' },
  { path: 'forgot', component: ForgottenpasswordComponent, data: { breadcrumb: 'Recuperar Contraseña' }, outlet: 'auth' },
  { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Registrarme' }, outlet: 'auth', pathMatch: 'full' },
  { path: 'main', component: MainComponent, data: { breadcrumb: 'Home' }, outlet: 'auth', pathMatch: 'full' },
  { path: 'usuario', component: TablaUsuariosComponent, canActivate: [RoleGuardComponent], data: { breadcrumb: 'Gestión de Usuarios' } },
  { path: 'cliente', component: TablaClientesComponent, canActivate: [RoleGuardComponent], data: { breadcrumb: 'Gestión de Clientes' } },
  { path: 'adduser', component: AddUserComponent, canActivate: [RoleGuardComponent], data: { breadcrumb: 'Agregar Usuario' } },
  { path: 'cuentas', component: TablaCuentasComponent, canActivate: [RoleGuardComponent], data: { breadcrumb: 'Gestión de Cuentas' } },
  { path: 'tarjetas', component: TablaTarjetasComponent, canActivate: [RoleGuardComponent], data: { breadcrumb: 'Gestión de Tarjetas' } },
  { path: 'transferencias', component: TablatransferenciasComponent, canActivate: [RoleGuardComponent], data: { breadcrumb: 'Gestión de Transferencias' } },
  { path: 'not-authorized', component: NotAuthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
