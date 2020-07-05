import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/entity/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {

  cliente:Cliente = new Cliente(); 
  errors:String[]; 

  constructor(private clienteService:ClienteService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente(); 
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        )
      }
    })
  }

  create():void{
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        //swal.fire('Nuevo Cliente',`Cliente ${this.cliente.apellido} ${this.cliente.apellido}`,'success')
        swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido creado con exito!',
          text: `Cliente ${response.nombre} ${response.apellido}`,
          showConfirmButton: false,
          timer: 2000
        })
      },
      err =>{
        this.errors = err.error.error as String[]; 
        console.error('Codigo del error: ' +err.status ); 
        console.error(err.error.error); 
      }
    ); 
  }
 
  update():void{
    this.clienteService.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        //swal.fire('Nuevo Cliente',`Cliente ${this.cliente.apellido} ${this.cliente.apellido}`,'success')
        swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: response.Mensaje,
          text: `${response.cliente.nombre} ${response.cliente.apellido}`,
          showConfirmButton: false,
          timer: 2000
        })
      },
      err =>{
        this.errors = err.error.error as String[]; 
        console.error('Codigo del error: ' +err.status ); 
        console.error(err.error.error); 
      }
    )
  }

}
