import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fractales.html',
  styleUrls: ['./fractales.css']
})
export class FractalesComponent implements OnInit, OnDestroy {
  lineas: any[] = [];
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      this.generarArbol(time);
    });
  }

  generarArbol(time: any) {
    this.lineas = []; 
    
    
    const longitudBase = 40 + ((time.hours % 12) / 11) * 50; 
    
    
    const anguloApertura = 15 + (time.minutes / 59) * 40; 
    
    
    const viento = Math.sin(time.seconds * 0.3) * 12; 

    
    this.dibujarRama(250, 380, -90 + viento, longitudBase, 0, anguloApertura);
  }

  dibujarRama(x1: number, y1: number, angulo: number, longitud: number, profundidad: number, anguloApertura: number) {
    if (profundidad > 7) return; // Límite recursivo para no congelar el navegador

    const radianes = angulo * Math.PI / 180;
    const x2 = x1 + Math.cos(radianes) * longitud;
    const y2 = y1 + Math.sin(radianes) * longitud;

    
    const color = `hsl(${140 + profundidad * 15}, 80%, ${40 + profundidad * 8}%)`;
    const width = Math.max(1, 8 - profundidad);

    this.lineas.push({ x1, y1, x2, y2, color, width });

    
    this.dibujarRama(x2, y2, angulo - anguloApertura, longitud * 0.75, profundidad + 1, anguloApertura);
    this.dibujarRama(x2, y2, angulo + anguloApertura, longitud * 0.75, profundidad + 1, anguloApertura);
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}