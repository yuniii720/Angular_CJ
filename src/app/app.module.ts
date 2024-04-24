import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgottenpasswordComponent } from './components/forgottenpassword/forgottenpassword.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TablaUsuariosComponent } from './components/tables/tablausuarios/tablausuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { BotonestablaComponent } from './components/buttons/botonestabla/botonestabla.component';
import { AddUserComponent } from './components/modals/usuarios/add-user/add-user.component';
import { BtnAddUserComponent } from './components/buttons/btn-add-user/btn-add-user.component';
import { BtnAddClientComponent } from './components/buttons/btn-add-client/btn-add-client.component';
import { TablaClientesComponent } from './components/tables/tablaclientes/tablaclientes.component';
import { TablacuentasComponent } from './components/tables/tablacuentas/tablacuentas.component';
import { TablatarjetasComponent } from './components/tables/tablatarjetas/tablatarjetas.component';
import { RegisterComponent } from './components/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgottenpasswordComponent,
    HeaderComponent,
    MainComponent,
    TablaUsuariosComponent,
    BotonestablaComponent,
    AddUserComponent,
    BtnAddUserComponent,
    BtnAddClientComponent,
    TablaClientesComponent,
    TablacuentasComponent,
    TablatarjetasComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
