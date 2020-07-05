import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs'; 
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {map,catchError} from 'rxjs/operators'; 
import { Cliente } from '../entity/cliente';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8010/api/clientes"; 
  private httpHeader:HttpHeaders = new HttpHeaders({'content-type':'application/json'}); 

  constructor(private http:HttpClient,private router:Router) { }

  getClientes():Observable<Cliente[]>{
    //return of(CLIENTES); 
             //Una forma de convertir el Json del backend en la clase cliente
    //return this.http.get<Cliente[]>(this.urlEndPoint)
    return this.http.get(`${this.urlEndPoint}/list`).pipe(
      map(response=>response as Cliente[])
    )
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/client/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes']); 
        console.error(e.error.Mensaje)
        swal.fire(e.error.Mensaje,e.error.Error,'error'); 
        return throwError(e); 
      })
    );
  }

                           //maneja el observble con tipo Cliente
  create(cliente:Cliente): Observable<Cliente>{
    return this.http.post(`${this.urlEndPoint}/save`,cliente,{headers:this.httpHeader}).pipe(
      //Realizar casting del map que retorna el servidor 
      map((response:any) =>response.cliente as Cliente), 
      catchError(e =>{

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.Mensaje); 
        swal.fire(e.error.Mensaje,e.error.Error,'error'); 
        return throwError(e);
      })
    );
  }
                           //Manejar el observalbe con el tipo Map retornado por el servidor 
  update(cliente:Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/update/${cliente.id}`,cliente,{headers:this.httpHeader}).pipe(
      catchError(e =>{

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.Mensaje); 
        swal.fire(e.error.Mensaje,e.error.Error,'error'); 
        return throwError(e);
      })
    ); 
  }
  
  detele(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/delete/${id}`,{headers:this.httpHeader}).pipe(
      catchError(e =>{
        console.error(e.error.Mensaje); 
        swal.fire(e.error.Mensaje,e.error.Error,'error'); 
        return throwError(e);
      })
    ); 
  }

}
