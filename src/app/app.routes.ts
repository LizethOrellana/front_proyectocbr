import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DocumentoComponent } from './pages/documento/documento.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RecuperarContraseniaComponent } from './pages/recuperar-contrasenia/recuperar-contrasenia.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-documento', component: DocumentoComponent },
  { path: 'crear-usuario', component: UsuarioComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  {path:'recuperar-contrsenia', component: RecuperarContraseniaComponent},
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
];

