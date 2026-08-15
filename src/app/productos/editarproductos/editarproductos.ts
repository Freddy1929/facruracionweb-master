import { Component, Input, inject, OnInit, numberAttribute } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Producto, ProductosService } from '../productos-service';

@Component({
  selector: 'app-editarproductos',
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './editarproductos.html',
  styleUrl: './editarproductos.css',
})
export class Editarproductos implements OnInit {
  @Input({ transform: numberAttribute }) id!: number;

  private fb = inject(FormBuilder);
  private servicioProductos = inject(ProductosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productoId!: number;

  productoForm: FormGroup = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: [''],
    precioUnitario: [0, [Validators.required, Validators.min(0)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
    activo: [true],
    fechaCreacion: ['']
  });

  ngOnInit(): void {
    this.productoId = this.id || Number(this.route.snapshot.paramMap.get('id'));

    if (this.productoId) {
      this.servicioProductos.obtenertodoslosProductos().subscribe({
        next: (productos) => {
          const encontrado = productos.find(p => p.productoId === this.productoId);
          if (encontrado) {
            this.productoForm.patchValue(encontrado);
          }
        },
        error: (err: unknown) => console.error('Error al cargar el producto:', err)
      });
    }
  }

  guardar(): void {
    if (this.productoForm.invalid) return;

    const productoEditado: Producto = {
      productoId: this.productoId,
      ...this.productoForm.value
    };

    this.servicioProductos.actualizarProducto(this.productoId, productoEditado).subscribe({
      next: () => {
        this.router.navigate(['/listarProductos']);
      },
      error: (err: unknown) => {
        console.error('Error al actualizar el producto:', err);
      }
    });
  }
}