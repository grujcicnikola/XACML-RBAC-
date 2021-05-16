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
import { TreeViewComponent } from './editor/component/tree-view/tree-view.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TreeGridModule,
  EditService,
  ToolbarService
} from '@syncfusion/ej2-angular-treegrid';
import { TaskDataService } from './service/taskDataService/task-data.service';
import { TreeViewObservablesComponent } from './editor/component/tree-view-observables/tree-view-observables.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TreeGridComponent } from './editor/component/tree-grid/tree-grid.component';
import { DialogViewComponent } from './editor/component/dialog-view/dialog-view.component';

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
    TreeViewComponent,
    TreeViewObservablesComponent,
    TreeGridComponent,
    DialogViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TreeViewModule,
    TreeGridModule, 
    //InMemoryWebApiModule.forRoot(TaskDataService),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    ),
  ],
  providers: [httpInterceptorProviders, EditService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
