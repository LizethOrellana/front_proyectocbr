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
import { FormDocumentoComponent } from './pages/form-documento/form-documento.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear-documento', component: FormDocumentoComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
];
