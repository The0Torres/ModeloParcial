import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

interface Actor {
  nombre: string;
  apellido: string;
  documento: string;
  edad: number;
  pais: string;
}


@Component({
  selector: 'app-tabla-actores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-actores.component.html',
  styleUrls: ['./tabla-actores.component.css']
})
export class TablaActoresComponent implements OnInit {
  @Output() actorSeleccionado = new EventEmitter<string>();
  actores: Actor[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const actoresCollection = collection(this.firestore, 'actores');
    collectionData(actoresCollection).subscribe((data: any[]) => {
      this.actores = data.map(actor => ({
        ...actor,
      }));
    });
  }

  seleccionarActor(actor: Actor): void {
    const nombreCompleto = `${actor.nombre} ${actor.apellido}`;
    this.actorSeleccionado.emit(nombreCompleto);
    console.log(`Actor seleccionado: ${nombreCompleto}`);
  }
}
