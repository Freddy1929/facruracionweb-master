import { Component, inject, OnInit, ViewChild, signal, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Cliente, ClientesService } from '../clientes';

@Component({
  selector: 'app-listar-clientes',
  imports: [
    RouterLink, 
    MatButtonModule, 
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.css',
})
export class ListarClientes implements OnInit, AfterViewInit {
  private servicioClientes = inject(ClientesService);
  clientes = signal<any[]>([]);
  
  // Coinciden exactamente con matColumnDef de listar-clientes.html
  displayedColumns: string[] = ['clienteId', 'nombre', 'apellido', 'cedulaRuc', 'correo', 'telefono', 'direccion', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarClientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarClientes(): void {
    this.servicioClientes.getClientes().subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.dataSource.data = data;
      },
      error: (err) => console.error('Error al cargar la lista de clientes:', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Deseas eliminar este cliente?')) {
      this.servicioClientes.eliminarCliente(id).subscribe({
        next: () => this.cargarClientes(),
        error: (err) => console.error('Error al eliminar cliente:', err)
      });
    }
  }
}