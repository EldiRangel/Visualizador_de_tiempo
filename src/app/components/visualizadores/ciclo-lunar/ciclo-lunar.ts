import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-ciclo-lunar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ciclo-lunar.html',
  styleUrls: ['./ciclo-lunar.css']
})
export class CicloLunarComponent implements OnInit, OnDestroy {
  fase: number = 0; 
  nombreFase: string = 'Luna Nueva';
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      
      const segundosDelDia = (time.hours * 3600) + (time.minutes * 60) + time.seconds + (time.milliseconds / 1000);
      const porcentajeDia = segundosDelDia / 86400; 
      
      this.fase = (porcentajeDia * 200) - 100;
      this.actualizarNombreFase(porcentajeDia);
    });
  }

  actualizarNombreFase(porcentaje: number) {
    if (porcentaje < 0.1 || porcentaje > 0.9) this.nombreFase = 'Luna Nueva';
    else if (porcentaje >= 0.1 && porcentaje < 0.4) this.nombreFase = 'Cuarto Creciente';
    else if (porcentaje >= 0.4 && porcentaje < 0.6) this.nombreFase = 'Luna Llena';
    else this.nombreFase = 'Cuarto Menguante';
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}