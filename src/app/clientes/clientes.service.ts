import swal  from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, map, of, throwError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  constructor(private http: HttpClient, private router: Router) {}
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  getClientes(page: number): Observable<any> {
    console.log("Cliente Service: getClientes");
    console.log(`${this.urlEndpoint}/search?page=${page}`);
    return this.http.get(`${this.urlEndpoint}/search?page=${page}`).pipe(
      tap((response: any) => {
        console.log("Cliente Service: tap 1");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.name);
        })
      }),
      map((response: any) => {
        console.log("Cliente Service: map");
        (response.content as Cliente[]).map((cliente) => {
          cliente.name = cliente.name.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap((response: any) => {
        console.log("Cliente Service: tap 2");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.name);
        })
      }),
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, {
      headers: this.httpHeaders,
    }).pipe(
      map((response: any) => response.data as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.message, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      map((response: any) => response.data as Cliente),
      catchError(e => {
        this.router.navigate(['/clientes']);
        swal.fire('Error al obtener el cliente', e.error.message, 'error')
        return throwError(e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(
      `${this.urlEndpoint}/${cliente.id}`,
      cliente,
      { headers: this.httpHeaders }
    ).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.message, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  deleteClient(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {
      headers: this.httpHeaders,
    }).pipe(
      catchError(e => {
        swal.fire(e.error.message, e.error.error, 'error')
        return throwError(e);
      })
    );
  }
}
