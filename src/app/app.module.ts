import 'intersection-observer';
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
import { BtnSaveClientComponent } from './components/buttons/cliente/btn-save-client/btn-save-client.component';
import { TarjetavisualComponent } from './components/tarjetavisual/tarjetavisual.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HeaderlandingComponent } from './components/headerlanding/headerlanding.component';
import { AsistenteComponent } from './components/asistente/asistente.component';
import { BtnAddTarjetaComponent } from './components/buttons/tarjeta/btn-add-tarjeta/btn-add-tarjeta.component';
import { BtnModTarjetaComponent } from './components/buttons/tarjeta/btn-mod-tarjeta/btn-mod-tarjeta.component';
import { BtnDelTarjetaComponent } from './components/buttons/tarjeta/btn-del-tarjeta/btn-del-tarjeta.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { CustomMatPaginatorIntl } from './components/tables/custom-paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateColumnPipe } from './components/tables/translate-column.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';
import { EuroCurrencyPipe } from './pipes/euro-currency.pipe';
import { MainclienteComponent } from './components/maincliente/maincliente.component';
import { BtnSaveAccountComponent } from './components/buttons/cuenta/btn-save-account/btn-save-account.component';
import { SaveAccountComponent } from './components/modals/cuentas/save-account/save-account.component';
import { SaveClientsComponent } from './components/modals/clientes/save-clients/save-clients.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BtnVerTarjetaComponent } from './components/buttons/tarjeta/btn-ver-tarjeta/btn-ver-tarjeta.component';
import { SeeCardComponent } from './components/modals/tarjetas/see-card/see-card.component';
import { TablaMovimientosComponent } from './components/tables/tablamovimientos/tablamovimientos.component';
import { BtnAddMovimientoComponent } from './components/buttons/movimientos/btn-add-movimiento/btn-add-movimiento.component';
import { BtnDelMovimientoComponent } from './components/buttons/movimientos/btn-del-movimiento/btn-del-movimiento.component';
import { BtnModMovimientoComponent } from './components/buttons/movimientos/btn-mod-movimiento/btn-mod-movimiento.component';
import { AddMovimientoComponent } from './components/modals/movimientos/add-movimiento/add-movimiento.component';
import { ModMovimientoComponent } from './components/modals/movimientos/mod-movimiento/mod-movimiento.component';
import { DelMovimientoComponent } from './components/modals/movimientos/del-movimiento/del-movimiento.component';
import { BtnBizumTarjetaComponent } from './components/buttons/tarjeta/btn-bizum-tarjeta/btn-bizum-tarjeta.component';
import { BizumCardComponent } from './components/modals/tarjetas/bizum-card/bizum-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from './components/footer/footer.component';
import { HipotecaComponent } from './components/hipoteca/hipoteca.component';

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
    FooterComponent,
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
    BtnSaveClientComponent,
    TarjetavisualComponent,
    LandingpageComponent,
    HeaderlandingComponent,
    AsistenteComponent,
    BtnAddTarjetaComponent,
    BtnModTarjetaComponent,
    BtnDelTarjetaComponent,
    TranslateColumnPipe,
    BreadcrumbsComponent,
    AppComponent,
    HeaderComponent,
    MainclienteComponent,
    BtnSaveAccountComponent,
    SaveAccountComponent,
    EuroCurrencyPipe,
    SaveClientsComponent,
    BtnVerTarjetaComponent,
    SeeCardComponent,
    TablaMovimientosComponent,
    BtnAddMovimientoComponent,
    BtnDelMovimientoComponent,
    BtnModMovimientoComponent,
    AddMovimientoComponent,
    ModMovimientoComponent,
    DelMovimientoComponent,
    BtnBizumTarjetaComponent,
    BizumCardComponent,
    HipotecaComponent
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
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    EuroCurrencyPipe,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    AuthService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
