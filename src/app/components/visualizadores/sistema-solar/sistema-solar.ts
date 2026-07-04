import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-sistema-solar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sistema-solar.html',
  styleUrls: ['./sistema-solar.css']
})
export class SistemaSolarComponent implements OnInit, OnDestroy {
  
  rotacionTierra: number = 0;
  rotacionLuna: number = 0;
  rotacionCometa: number = 0;

  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      
      const segundosDelDia = (time.hours * 3600) + (time.minutes * 60) + time.seconds + (time.milliseconds / 1000);
      this.rotacionTierra = (segundosDelDia / 86400) * 360;

      const segundosDeHora = (time.minutes * 60) + time.seconds + (time.milliseconds / 1000);
      this.rotacionLuna = (segundosDeHora / 3600) * 360;

      const segundosDelMinuto = time.seconds + (time.milliseconds / 1000);
      this.rotacionCometa = (segundosDelMinuto / 60) * 360;
    });
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }
}