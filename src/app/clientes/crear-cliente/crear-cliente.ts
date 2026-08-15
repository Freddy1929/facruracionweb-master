import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../clientes';

@Component({
  selector: 'app-crear-cliente',
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './crear-cliente.html',
  styleUrl: './crear-cliente.css',
})
export class CrearCliente {
  private fb = inject(FormBuilder);
  private servicioClientes = inject(ClientesService);
  private router = inject(Router);

  clienteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    cedulaRuc: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: [''],
    direccion: [''],
    activo: [true]
  });

  guardar(): void {
    //if (this.clienteForm.invalid) return;

    const datos = this.clienteForm.value;

  
    const nuevoCliente: any = {
      cedula: datos.cedulaRuc,
      nombres: datos.nombre,
      apellidos: datos.apellido,
      telefono: datos.telefono || '',
      direccion: datos.direccion || '',
      email: datos.correo,
      esConsumidorFinal: true
    };

    this.servicioClientes.crearCliente(nuevoCliente).subscribe({
      next: (respuesta) => {
        console.log(respuesta)
        this.router.navigate(['/listarClientes']);
      },
      error: (err) => {
        console.error('Detalle completo del error:', err);
        
        
        if (err.status === 0) {
          alert('Error de conexión (CORS). El servidor API no permite peticiones desde localhost.');
        } else {
          alert(`Error ${err.status}: ${JSON.stringify(err.error?.errors || err.message)}`);
        }
      }
    });
  }
}