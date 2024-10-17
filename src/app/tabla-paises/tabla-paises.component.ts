import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css'
})
export class TablaPaisesComponent {
  @Output() paisSeleccionado = new EventEmitter<string>();
  paises: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (data) => {
        this.paises = data;
      },
      (error) => {
        console.error('Error al obtener los países:', error);
      }
    );
  }

  seleccionarPais(pais: string) {
    this.paisSeleccionado.emit(pais);
  }


}