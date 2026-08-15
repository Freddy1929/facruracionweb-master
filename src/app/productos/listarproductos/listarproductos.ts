import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto, ProductosService } from '../productos-service';

@Component({
  selector: 'app-listarproductos',
  imports: [MatButtonModule, MatTableModule, RouterLink],
  templateUrl: './listarproductos.html',
  styleUrl: './listarproductos.css',
})
export class Listarproductos implements OnInit {
  displayedColumns: string[] = [
    'activo', 'cantidad', 'codigo', 'descripcion', 'fechaCreacion',
    'nombre', 'precioUnitario', 'productoId', 'acciones',
  ];
  dataSource = new MatTableDataSource<Producto>();

  private servicioProductos = inject(ProductosService);
  private router = inject(Router);

  ngOnInit(): void {
    this.servicioProductos.obtenertodoslosProductos().subscribe({
      next: (respuesta) => this.dataSource.data = respuesta,
      error: (error) => console.error('Error al obtener los productos:', error),
    });
  }

  editarProducto(producto: Producto): void {
    this.router.navigate(['/editarProductos', producto.productoId]);
  }

  eliminarProducto(producto: Producto): void {
    if (!window.confirm(`¿Eliminar el producto "${producto.nombre}"?`)) return;

    this.servicioProductos.eliminarProducto(producto.productoId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.productoId !== producto.productoId,
        );
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        window.alert('No fue posible eliminar el producto. Inténtalo nuevamente.');
      },
    });
  }
}