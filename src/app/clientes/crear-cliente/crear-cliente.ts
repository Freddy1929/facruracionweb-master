import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientesService } from '../clientes';

@Component({
  selector: 'app-crear-cliente',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './crear-cliente.html',
  styleUrl: './crear-cliente.css',
})
export class CrearCliente {
  private fb = inject(FormBuilder);
  private clientesService = inject(ClientesService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    cedula: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required]
  });

  obtenerMensajeError(campo: string): string {
    const control = this.form.get(campo);
    if (control?.hasError('required')) return 'Este campo es requerido';
    if (control?.hasError('email')) return 'Correo no válido';
    return '';
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Armamos la estructura asegurando tipos estrictos para la API
    const nuevoCliente = {
      nombres: String(this.form.value.nombres),
      apellidos: String(this.form.value.apellidos),
      cedula: String(this.form.value.cedula),
      email: String(this.form.value.email),
      telefono: String(this.form.value.telefono),
      direccion: String(this.form.value.direccion),
      esConsumidorFinal: false
    };

    console.log('Enviando datos al servidor:', nuevoCliente);

    this.clientesService.crearCliente(nuevoCliente).subscribe({
      next: (res: any) => {
        console.log('Respuesta exitosa del servidor:', res);
        this.router.navigate(['/listarClientes']);
      },
      error: (err: any) => {
        console.error('Error detallado devuelto por la API:', err);
      }
    });
  }
}