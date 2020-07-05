import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/entity/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes:Cliente[];

  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
      //el lo mismo que 
      //function(clientes){
        //this.clientes = clientes; 
      //}
    );  
  }

  delete(cliente:Cliente):void{
    swal.fire({
      title: 'Estas seguro?',
      text: "¿Desea eliminar éste cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.detele(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli=>cli!=cliente)
            swal.fire(
              'Deleted!',
              'Cliente eliminado con exito!',
              'success'
            )
          }
        )
       
      }
    })
  }

}
