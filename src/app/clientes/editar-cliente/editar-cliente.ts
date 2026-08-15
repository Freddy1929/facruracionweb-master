import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Cliente, ClientesService } from '../clientes';

@Component({
  selector: 'app-editar-cliente',
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './editar-cliente.html',
  styleUrl: './editar-cliente.css',
})
export class EditarCliente implements OnInit {
  private fb = inject(FormBuilder);
  private servicioClientes = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  clienteId: number = 0;

  clienteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    cedulaRuc: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: [''],
    direccion: [''],
    activo: [true]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clienteId = Number(idParam);
      this.cargarCliente();
    }
  }

  cargarCliente(): void {
    this.servicioClientes.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        const cliente = clientes.find((c) => (c.clienteId || c.clienteId) === this.clienteId);
        if (cliente) {
          this.clienteForm.patchValue(cliente);
        }
      },
      error: (err) => console.error('Error al obtener cliente:', err)
    });
  }

  guardar(): void {
    if (this.clienteForm.invalid) return;

    const datos = this.clienteForm.value;
    const clienteActualizado: Cliente = {
      clienteId: this.clienteId,
      nombres: datos.nombre,
      apellidos: datos.apellido,
      cedula: datos.cedulaRuc,
      email: datos.correo,
      telefono: datos.telefono || '',
      direccion: datos.direccion || '',
      esConsumidorFinal: '',
    };

    this.servicioClientes.actualizarCliente(this.clienteId, clienteActualizado).subscribe({
      next: () => {
        this.router.navigate(['/listarClientes']);
      },
      error: (err) => console.error('Error al actualizar cliente:', err)
    });
  }
}