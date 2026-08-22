import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Producto, ProductosService } from '../productos-service';

@Component({
  selector: 'app-listarproductos',
  imports: [
    MatButtonModule, 
    MatTableModule, 
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './listarproductos.html',
  styleUrl: './listarproductos.css',
})
export class Listarproductos implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'activo', 'cantidad', 'codigo', 'descripcion', 'fechaCreacion',
    'nombre', 'precioUnitario', 'productoId', 'acciones',
  ];
  dataSource = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private servicioProductos = inject(ProductosService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarProductos(): void {
    this.servicioProductos.obtenertodoslosProductos().subscribe({
      next: (respuesta) => {
        this.dataSource.data = respuesta;
      },
      error: (error) => console.error('Error al obtener los productos:', error),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarProducto(producto: Producto): void {
    if (producto.productoId) {
      this.router.navigate(['/editarProductos', producto.productoId]);
    }
  }

  eliminarProducto(producto: Producto): void {
    if (!producto.productoId) return;

    if (!window.confirm(`¿Eliminar el producto "${producto.nombre}"?`)) return;

    this.servicioProductos.eliminarProducto(producto.productoId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.productoId !== producto.productoId
        );
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        window.alert('No fue posible eliminar el producto. Inténtalo nuevamente.');
      },
    });
  }
}