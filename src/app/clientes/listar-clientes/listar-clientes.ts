import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Cliente, ClientesService } from '../clientes';

@Component({
  selector: 'app-listar-clientes',
  imports: [RouterLink, MatButtonModule, CommonModule],
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.css',
})
export class ListarClientes implements OnInit {
  private servicioClientes = inject(ClientesService);
  //public clientes: any;
  clientes = signal(null);

  ngOnInit(): void {
    this.servicioClientes.getClientes().subscribe({
      next: data => {
        this.clientes.set(data);
        console.log("1");
                console.log(this.clientes)
      },
      error: (err) => console.error('Error al cargar la lista de clientes:', err)
    });
  }

  cargarClientes(): void {
    this.servicioClientes.getClientes().subscribe({
      next: data => {
        console.log(data)
        this.clientes = data;
        console.log("1");
                console.log(this.clientes)
      },
      error: (err) => console.error('Error al cargar la lista de clientes:', err)
    });
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