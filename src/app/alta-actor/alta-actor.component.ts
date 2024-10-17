import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablaPaisesComponent } from '../tabla-paises/tabla-paises.component';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Actor {
  nombre: string;
  apellido: string;
  documento: string;
  edad: number;
  pais: string;
}

@Component({
  selector: 'app-alta-actor',
  standalone: true,
  imports: [CommonModule, FormsModule, TablaPaisesComponent],
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.css']
})
export class AltaActorComponent implements OnInit {
  actor: Actor = {
    nombre: '',
    apellido: '',
    documento: '',
    edad: 0,
    pais: ''
  };

  actores$: Observable<Actor[]>;

  constructor(private firestore: Firestore) {
    const actoresCollection = collection(this.firestore, 'actores');
    this.actores$ = collectionData(actoresCollection) as Observable<Actor[]>;
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.isFormValid()) {
      try {
        const actoresRef = collection(this.firestore, 'actores');
        await addDoc(actoresRef, this.actor);
        console.log("Actor added successfully");
        this.resetForm();
      } catch (e) {
        console.error("Error adding actor: ", e);
      }
    } 
  }

  isFormValid(): boolean {
    return this.actor.nombre.trim() !== '' &&
           this.actor.apellido.trim() !== '' &&
           this.actor.documento.trim() !== '' &&
           this.actor.edad > 0 &&
           this.actor.pais.trim() !== '';
  }

  resetForm(): void {
    this.actor = {
      nombre: '',
      apellido: '',
      documento: '',
      edad: 0,
      pais: ''
    };
  }

  onPaisSeleccionado(pais: string): void {
    this.actor.pais = pais;
  }
}
