import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgottenpasswordComponent } from './forgottenpassword/forgottenpassword.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TablaUsuariosComponent } from './tablas/tablausuarios/tablausuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { BotonestablaComponent } from './botones/botonestabla/botonestabla.component';
import { AddUserComponent } from './modals/usuarios/add-user/add-user.component';
import { BtnAddUserComponent } from './botones/btn-add-user/btn-add-user.component';
import { BtnAddClientComponent } from './botones/btn-add-client/btn-add-client.component';
import { TablaClientesComponent } from './tablas/tablaclientes/tablaclientes.component';
import { TablacuentasComponent } from './tablas/tablacuentas/tablacuentas.component';
import { TablatarjetasComponent } from './tablas/tablatarjetas/tablatarjetas.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { EmailserviceService } from './services/emailservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BtnModUserComponent } from './botones/btn-mod-user/btn-mod-user.component';
import { BtnDelUserComponent } from './botones/btn-del-user/btn-del-user.component';
import { ModUserComponent } from './modals/usuarios/mod-user/mod-user.component';

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
