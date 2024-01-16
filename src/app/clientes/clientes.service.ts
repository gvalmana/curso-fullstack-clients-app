import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private urlEndpoint: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndpoint, cliente, {
      headers: this.httpHeaders,
    });
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.urlEndpoint}/${cliente.id}`,
      cliente,
      { headers: this.httpHeaders }
    );
  }

  deleteClient(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
