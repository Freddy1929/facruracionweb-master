import { Component, Input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editarproductos',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './editarproductos.html',
  styleUrl: './editarproductos.css',
})
export class Editarproductos {
  @Input({ transform: numberAttribute }) id!: number;
}