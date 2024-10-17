import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Pelicula {
  id?: string;
  nombre: string;
  tipo: string;
  fechaEstreno: string;
  cantidadPublico: number;
  foto: string;
  protagonista: string;
}

@Component({
  selector: 'app-peliculas-actor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas-actor.component.html',
  styleUrls: ['./peliculas-actor.component.css'], 
})
export class PeliculasActorComponent implements OnChanges {
  @Input() actorNombre?: string = ''; 
  peliculas: Pelicula[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnChanges() {
    if (this.actorNombre) {
      this.obtenerPeliculasActor();
    }
  }

  obtenerPeliculasActor() {
    this.firestore
      .collection<Pelicula>('peliculas', (ref) =>
        ref.where('protagonista', '==', this.actorNombre)
      )
      .valueChanges({ idField: 'id' })
      .subscribe((peliculas) => {
        this.peliculas = peliculas;
      });
  }
}
