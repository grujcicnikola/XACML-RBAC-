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
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TreeGridModule,
  EditService,
  ToolbarService
} from '@syncfusion/ej2-angular-treegrid';
import { TreeGridComponent } from './editor/component/tree-grid/tree-grid.component';
import { DialogViewComponent } from './editor/component/dialog-view/dialog-view.component';
import { ChooseWhatToCreateComponent } from './editor/component/choose-what-to-create/choose-what-to-create.component';

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
    RegisterComponent,
    TreeGridComponent,
    DialogViewComponent,
    ChooseWhatToCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TreeViewModule,
    TreeGridModule, 
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    ),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
