import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
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
    BtnAddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
