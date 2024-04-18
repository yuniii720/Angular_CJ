import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgottenpasswordComponent } from './forgottenpassword/forgottenpassword.component';
import { MainComponent } from './main/main.component';
import { TablaUsuariosComponent } from './tablausuarios/tablausuarios.component';
import { AddUserComponent } from './add-user/add-user.component';

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
    path: 'cliente',
    component: TablaUsuariosComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },

  {
    path: 'adduser',
    component: AddUserComponent,
    outlet: 'auth',
    pathMatch: 'full'
  },

  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


