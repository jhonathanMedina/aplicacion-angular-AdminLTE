import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs'; 
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {map,catchError} from 'rxjs/operators'; 
import swal from 'sweetalert2';
import { Producto } from '../entity/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint:string = "http://localhost:8010/api/productos"; 
  private httpHeader:HttpHeaders = new HttpHeaders({'content-type':'application/json'}); 

  constructor(private http:HttpClient,private router:Router) { }

  getProductos():Observable<Producto[]>{
    return this.http.get(`${this.urlEndPoint}/list`).pipe(
      map(response=>response as Producto[])
    )
  }


}
