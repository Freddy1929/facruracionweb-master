import { Routes } from '@angular/router';
import { Listarproductos } from './productos/listarproductos/listarproductos';
import { Editarproductos } from './productos/editarproductos/editarproductos';
import { CrearProducto } from './productos/crear-producto/crear-producto';
import { PaginaNoEncontrada } from './pagina-no-encontrada/pagina-no-encontrada';
import { CrearCliente } from './clientes/crear-cliente/crear-cliente';
import { EditarCliente } from './clientes/editar-cliente/editar-cliente';
import { ListarClientes } from './clientes/listar-clientes/listar-clientes';

export const routes: Routes = [
  { path: '', redirectTo: 'listarProductos', pathMatch: 'full' },
  { path: 'listarProductos', component: Listarproductos },
  { path: 'editarProductos/:id', component: Editarproductos },
  { path: 'crearProducto', component: CrearProducto },

  { path: 'listarClientes', component: ListarClientes },
  { path: 'crearCliente', component: CrearCliente },
  { path: 'editarCliente/:id', component: EditarCliente },

  { path: 'paginaNoEncontrada', component: PaginaNoEncontrada },
  { path: '**', redirectTo: 'paginaNoEncontrada' }
];