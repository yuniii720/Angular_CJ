import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './components/register/register.component';
import { EmailserviceService } from './services/emailservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BtnModUserComponent } from './components/buttons/btn-mod-user/btn-mod-user.component';
import { BtnDelUserComponent } from './components/buttons/btn-del-user/btn-del-user.component';
import { ModUserComponent } from './components/modals/usuarios/mod-user/mod-user.component';
import { DelUserComponent } from './components/modals/usuarios/del-user/del-user.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';

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
    BtnModUserComponent,
    BtnDelUserComponent,
    ModUserComponent,
    DelUserComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    EmailserviceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
