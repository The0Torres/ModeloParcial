import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listado-actores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-actores.component.html',
  styleUrl: './listado-actores.component.css'
})
export class ListadoActoresComponent {
  @Input() actores: any[] = [];
  @Output() actorSeleccionado = new EventEmitter<any>();

  seleccionarActor(actor: any) {
    this.actorSeleccionado.emit(actor);  
  }
}
