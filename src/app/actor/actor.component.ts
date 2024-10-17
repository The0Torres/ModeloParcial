import { Component, OnInit } from '@angular/core';
import { ListadoActoresComponent } from '../listado-actores/listado-actores.component';
import { DetalleActorComponent } from '../detalle-actor/detalle-actor.component';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DetallePaisComponent } from '../detalle-pais/detalle-pais.component';
import { PeliculasActorComponent } from '../peliculas-actor/peliculas-actor.component';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule, ListadoActoresComponent, DetalleActorComponent, DetallePaisComponent,PeliculasActorComponent],
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  actores: any[] = [];
  selectedActor: any | null = null;
  selectedPais: any | null = null; 

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.getActores().subscribe((actores) => {
      this.actores = actores;
    });
  }

  onActorSelected(actor: any) {
    this.selectedActor = actor;
  }

  getActores(): Observable<any[]> {
    return this.firestore
      .collection<any>('actores')
      .valueChanges({ idField: 'id' });
  }
}
