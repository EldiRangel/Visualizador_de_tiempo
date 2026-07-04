import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-matriz-pixeles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriz-pixeles.html',
  styleUrls: ['./matriz-pixeles.css']
})
export class MatrizPixelesComponent implements OnInit, OnDestroy {
  pixeles: boolean[] = Array(100).fill(false); 
  porcentaje: number = 0;
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      const segundosDelDia = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
      this.porcentaje = (segundosDelDia / 86400) * 100;
      
      const pixelesEncendidos = Math.floor(this.porcentaje);
      
      
      this.pixeles = this.pixeles.map((_, index) => index < pixelesEncendidos);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}