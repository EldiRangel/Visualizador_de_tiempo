import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-barra-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-dia.html',
  styleUrls: ['./barra-dia.css']
})
export class BarraDiaComponent implements OnInit, OnDestroy {
  porcentajePasado: number = 0;
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      
      const segundosDelDia = (time.hours * 3600) +  (time.minutes * 60) +  time.seconds + (time.milliseconds / 1000);
                             
     
      this.porcentajePasado = (segundosDelDia / 86400) * 100;
    });
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }
}