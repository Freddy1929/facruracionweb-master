import { Routes } from '@angular/router';
import { Listarproductos } from './productos/listarproductos/listarproductos';
import { Editarproductos } from './productos/editarproductos/editarproductos';
import { CrearProducto } from './productos/crear-producto/crear-producto';
import { PaginaNoEncontrada } from './pagina-no-encontrada/pagina-no-encontrada';

export const routes: Routes = [
  { path: '', redirectTo: 'listarProductos', pathMatch: 'full' },
  { path: 'listarProductos', component: Listarproductos },
  { path: 'editarProductos/:id', component: Editarproductos },
  { path: 'crearProducto', component: CrearProducto },
  { path: 'paginaNoEncontrada', component: PaginaNoEncontrada },
  { path: '**', redirectTo: 'paginaNoEncontrada' }
];