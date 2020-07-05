import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/entity/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:Producto[]; 

  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos
      //el lo mismo que 
      //function(clientes){
        //this.clientes = clientes; 
      //}
    );  
  }


  

}
