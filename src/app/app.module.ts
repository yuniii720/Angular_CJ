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
import { BtnAddUserComponent } from './components/buttons/usuario/btn-add-user/btn-add-user.component';
import { BtnAddClientComponent } from './components/buttons/cliente/btn-add-client/btn-add-client.component';
import { TablaClientesComponent } from './components/tables/tablaclientes/tablaclientes.component';
import { TablaCuentasComponent } from './components/tables/tablacuentas/tablacuentas.component';
import { TablaTarjetasComponent } from './components/tables/tablatarjetas/tablatarjetas.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BtnModUserComponent } from './components/buttons/usuario/btn-mod-user/btn-mod-user.component';
import { BtnDelUserComponent } from './components/buttons/usuario/btn-del-user/btn-del-user.component';
import { ModUserComponent } from './components/modals/usuarios/mod-user/mod-user.component';
import { DelUserComponent } from './components/modals/usuarios/del-user/del-user.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AddClientComponent } from './components/modals/clientes/add-client/add-client.component';
import { ModClientComponent } from './components/modals/clientes/mod-client/mod-client.component';
import { DelClientComponent } from './components/modals/clientes/del-client/del-client.component';
import { BtnModClientComponent } from './components/buttons/cliente/btn-mod-client/btn-mod-client.component';
import { BtnDelClientComponent } from './components/buttons/cliente/btn-del-client/btn-del-client.component';
import { TablatransferenciasComponent } from './components/tables/tablatransferencias/tablatransferencias.component';
import { AddAccountComponent } from './components/modals/cuentas/add-account/add-account.component';
import { ModAccountComponent } from './components/modals/cuentas/mod-account/mod-account.component';
import { DelAccountComponent } from './components/modals/cuentas/del-account/del-account.component';
import { BtnAddAccountComponent } from './components/buttons/cuenta/btn-add-account/btn-add-account.component';
import { BtnModAccountComponent } from './components/buttons/cuenta/btn-mod-account/btn-mod-account.component';
import { BtnDelAccountComponent } from './components/buttons/cuenta/btn-del-account/btn-del-account.component';
import { AddCardComponent } from './components/modals/tarjetas/add-card/add-card.component';
import { ModCardComponent } from './components/modals/tarjetas/mod-card/mod-card.component';
import { DelCardComponent } from './components/modals/tarjetas/del-card/del-card.component';
import { BtnSaveUsersComponent } from './components/buttons/usuario/btn-save-users/btn-save-users.component';
import { SaveUsersComponent } from './components/modals/usuarios/save-users/save-users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AlertComponent } from './components/alert/alert.component';
import { BtnSaveClientComponent } from './components/buttons/cliente/btn-save-client/btn-save-client.component';
import { TarjetavisualComponent } from './components/tarjetavisual/tarjetavisual.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HeaderlandingComponent } from './components/headerlanding/headerlanding.component';
import { AsistenteComponent } from './components/asistente/asistente.component'; // Importa AsistenteComponent aquí

@NgModule({
  declarations: [
    AppComponent,
    ForgottenpasswordComponent,
    HeaderComponent,
    MainComponent,
    TablaUsuariosComponent,
    BotonestablaComponent,
    AddUserComponent,
    BtnAddUserComponent,
    BtnAddClientComponent,
    TablaClientesComponent,
    TablaCuentasComponent,
    TablaTarjetasComponent,
    LoginComponent,
    RegisterComponent,
    BtnModUserComponent,
    BtnDelUserComponent,
    ModUserComponent,
    DelUserComponent,
    ConfirmDialogComponent,
    AddClientComponent,
    ModClientComponent,
    DelClientComponent,
    BtnModClientComponent,
    BtnDelClientComponent,
    TablatransferenciasComponent,
    AddAccountComponent,
    ModAccountComponent,
    DelAccountComponent,
    BtnAddAccountComponent,
    BtnModAccountComponent,
    BtnDelAccountComponent,
    AddCardComponent,
    ModCardComponent,
    DelCardComponent,
    BtnSaveUsersComponent,
    SaveUsersComponent,
    AlertComponent,
    BtnSaveClientComponent,
    TarjetavisualComponent,
    LandingpageComponent,
    HeaderlandingComponent,
    AsistenteComponent
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
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
