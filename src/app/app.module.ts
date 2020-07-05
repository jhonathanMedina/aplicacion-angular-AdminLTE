import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { ContentComponent } from './components/shared/content/content.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ClienteComponent } from './components/cliente/cliente.component';

import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';  
import {FormsModule} from '@angular/forms';
import { ProductosComponent } from './components/productos/productos.component';
import { InvoiceComponent } from './components/invoice/invoice.component'; 

const routes:Routes=[
  {path:'',redirectTo:'./clientes',pathMatch:'full'},
  {path:'clientes',component:ClienteComponent}, 
  {path:"clientes/form",component:ClienteFormComponent},
  {path:"clientes/form/:id",component:ClienteFormComponent},
  {path:'productos',component:ProductosComponent},
  {path:'invoice',component:InvoiceComponent}
]; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    ClienteComponent,
    ClienteFormComponent,
    ProductosComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
