import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.css'],
})
export class DetallePaisComponent implements OnChanges {
  @Input() pais?: string = '';
  detallesPais: any = null;

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    if (this.pais) {
      this.obtenerDetallesPais();
    }
  }

  obtenerDetallesPais() {
    this.http.get(`https://restcountries.com/v3.1/name/${this.pais}`).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.detallesPais = data[0];
        }
      },
      (error) => console.error('Error fetching country details', error)
    );
  }
}