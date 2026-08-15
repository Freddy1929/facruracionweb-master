import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Producto {
  productoId: number;
  activo: boolean;
  cantidad: number;
  codigo: string;
  descripcion: string;
  fechaCreacion: string;
  nombre: string;
  precioUnitario: number;
}

interface RespuestaProductos {
  value: Producto[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private http = inject(HttpClient);
  private urlbase = 'http://facturacion-api.runasp.net/api/Productos';

  obtenertodoslosProductos(): Observable<Producto[]> {
    return this.http
      .get<RespuestaProductos | Producto[]>(this.urlbase)
      .pipe(map((respuesta) => Array.isArray(respuesta) ? respuesta : respuesta.value));
  }

  eliminarProducto(productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.urlbase}/${productoId}`);
  }

  actualizarProducto(productoId: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.urlbase}/${productoId}`, producto);
  }
}