import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-pendulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pendulo.html',
  styleUrls: ['./pendulo.css']
})
export class PenduloComponent implements OnInit, OnDestroy {
  private sub: Subscription | null = null;
  
  anguloHoras: number = -90;
  anguloMinutos: number = -90;
  anguloSegundos: number = -90;

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    this.sub = this.timeService.time$.subscribe(t => {
  
      this.anguloHoras = -90 + ((t.hours / 24) * 180);
      this.anguloMinutos = -90 + ((t.minutes / 60) * 180);
      this.anguloSegundos = -90 + ((t.seconds / 60) * 180);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}