import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time'; 

@Component({
  selector: 'app-vela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vela.html',
  styleUrls: ['./vela.css']
})
export class VelaComponent implements OnInit, OnDestroy {
  alturaVela: number = 100;
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      // 24 horas tienen 86400 segundos
      const totalSegundosDia = 86400;
      const segundosActuales = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
      
      // Calcula el porcentaje restante de la vela
      this.alturaVela = 100 - ((segundosActuales / totalSegundosDia) * 100);
      
      // Evita que la vela desaparezca por completo
      if (this.alturaVela < 5) this.alturaVela = 5;
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}