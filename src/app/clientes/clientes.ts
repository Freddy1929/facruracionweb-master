import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
    clienteId?: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    email: string;
    esConsumidorFinal: string;
    fechaCreacion?: string;
    telefono?: number;
    direccion: string;
}


@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://facturacion-api.runasp.net/api/Clientes';

  getClientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}