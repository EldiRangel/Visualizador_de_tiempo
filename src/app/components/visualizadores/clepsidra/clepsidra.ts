import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-clepsidra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clepsidra.html',
  styleUrls: ['./clepsidra.css']
})
export class ClepsidraComponent implements OnInit, OnDestroy {
  porcentaje: number = 0; 
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      
      const segundosDelDia = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
      
      
      this.porcentaje = (segundosDelDia / 86400) * 100;
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}