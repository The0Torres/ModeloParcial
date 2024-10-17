import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-peliculas.component.html',
  styleUrls: ['./tabla-peliculas.component.css'],
})
export class TablaPeliculasComponent{
  @Input() peliculas: any[] = [];
  @Output() peliculaSeleccionada = new EventEmitter<any>();

  seleccionarPelicula(pelicula: any) {
    this.peliculaSeleccionada.emit(pelicula);
  }
}
