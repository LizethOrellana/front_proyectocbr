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

export const routes: Routes = [
    { path: 'app', component: AppComponent },
    { path: '', component: HomeComponent },
    { path: 'app-header', component: HeaderComponent },
    { path: 'app-footer', component: FooterComponent },
];

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        AppComponent, 
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        FormsModule,
        CommonModule,
    ],
    providers: [],
    bootstrap: [AppComponent] 
})
export class AppModule { }
