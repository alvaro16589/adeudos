import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    AsideBarComponent,
    
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    AsideBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  
    
    
  ]
})
export class SharedModule { }
