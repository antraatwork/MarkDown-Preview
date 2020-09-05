import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PreviewComponent} from './preview/preview.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      //by default,redirect to main component initially when there is no path 
      {path:'',redirectTo:'/mainpage',pathMatch:'full'},
      {path: 'preview',component:PreviewComponent,pathMatch:'full'},
      {path: 'mainpage',component:MainComponent,pathMatch:'full'},
      {path: '**',component: MainComponent}//wildcard route for main component,used if the path is not found 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
