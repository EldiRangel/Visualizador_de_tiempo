import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-reloj-arena',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-arena.html',
  styleUrls: ['./reloj-arena.css']
})
export class RelojArenaComponent implements OnInit, OnDestroy {
  porcentajePasado: number = 0;
  private timeSub!: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      const segundosActuales = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
      
      this.porcentajePasado = (segundosActuales / 86400) * 100;
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}