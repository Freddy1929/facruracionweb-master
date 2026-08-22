import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductosService } from '../productos-service';

@Component({
  selector: 'app-crear-producto',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css',
})
export class CrearProducto {
  private fb = inject(FormBuilder);
  private productosService = inject(ProductosService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precioUnitario: ['', [Validators.required, Validators.min(0)]],
    cantidad: ['', [Validators.required, Validators.min(0)]],
    activo: [true]
  });

  obtenerMensajeError(campo: string): string {
    const control = this.form.get(campo);
    if (control?.hasError('required')) return 'Campo requerido';
    if (control?.hasError('min')) return 'El valor debe ser positivo';
    return '';
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.productosService.crearProducto(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/listarProductos']);
      },
      error: (err: any) => console.error('Error al crear producto:', err)
    });
  }
}