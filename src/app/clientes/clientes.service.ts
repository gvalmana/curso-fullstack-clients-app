import swal  from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private urlEndpoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient, private router: Router) {}
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndpoint).pipe(
      map((response: any) => response.data as Cliente[]),
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
