import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/components/layout.component';
import { NotFoundModule } from './notFound/not-found.module';
import { SharedModule } from './shared/shared.module';








@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NotFoundModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
