import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/component/editor.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.moule';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './auth/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  {path: 'editor', component : EditorComponent},
  {path: '', component : LoginComponent},
  {path: 'register', component : RegisterComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    ),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
