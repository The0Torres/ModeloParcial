import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablaActoresComponent } from "../tabla-actores/tabla-actores.component";
import { Firestore, collection, addDoc, collectionData, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Pelicula {
  id: number;
  nombre: string;
  tipo: string;
  fechaEstreno: string;
  cantidadPublico: number;
  foto: string;
  protagonista: string;
}

@Component({
  selector: 'app-alta-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, TablaActoresComponent],
  templateUrl: './alta-pelicula.component.html',
  styleUrls: ['./alta-pelicula.component.css']
})
export class AltaPeliculaComponent implements OnInit {
  pelicula: Pelicula = {
    id: 0,
    nombre: '',
    tipo: '',
    fechaEstreno: '',
    cantidadPublico: 0,
    foto: '',
    protagonista: ''
  };

  tiposPelicula: string[] = [
    'Comedia',
    'Terror',
    'Amor',
    'Otros'
  ];

  peliculas$: Observable<Pelicula[]>;

  constructor(private firestore: Firestore) {
    const peliculasCollection = collection(this.firestore, 'peliculas');
    this.peliculas$ = collectionData(peliculasCollection) as Observable<Pelicula[]>;
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.isFormValid()) {
      try {

        const nextId = await this.getNextId();

        this.pelicula.id = nextId;

        const peliculasRef = collection(this.firestore, 'peliculas');
        await addDoc(peliculasRef, this.pelicula);

        console.log("Película agregada exitosamente con ID:", nextId);
        this.resetForm();
      } catch (e) {
        console.error("Error al agregar película: ", e);
      }
    }
  }


  async getNextId(): Promise<number> {
    const peliculasRef = collection(this.firestore, 'peliculas');
    const snapshot = await getDocs(peliculasRef);

    return snapshot.size + 1;
  }

  isFormValid(): boolean {
    return this.pelicula.nombre.trim() !== '' &&
           this.pelicula.tipo !== '' &&
           this.pelicula.fechaEstreno.trim() !== '' &&
           this.pelicula.cantidadPublico > 0 &&
           this.pelicula.foto.trim() !== '' &&
           this.pelicula.protagonista.trim() !== '';
  }

  resetForm(): void {
    this.pelicula = {
      id: 0,
      nombre: '',
      tipo: '',
      fechaEstreno: '',
      cantidadPublico: 0,
      foto: '',
      protagonista: ''
    };
  }

  onActorSeleccionado(protagonista: string): void {
    this.pelicula.protagonista = protagonista;
  }
}
