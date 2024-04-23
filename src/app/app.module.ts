import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgottenpasswordComponent } from './forgottenpassword/forgottenpassword.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TablaUsuariosComponent } from './tablausuarios/tablausuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { BotonestablaComponent } from './botonestabla/botonestabla.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BtnAddUserComponent } from './btn-add-user/btn-add-user.component';
import { BtnAddClientComponent } from './btn-add-client/btn-add-client.component';
import { TablaClientesComponent } from './tablaclientes/tablaclientes.component';
import { TablacuentasComponent } from './tablacuentas/tablacuentas.component';
import { TablatarjetasComponent } from './tablatarjetas/tablatarjetas.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { EmailserviceService } from './emailservice.service';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    HttpClientModule
  ],
  providers: [
    EmailserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

