import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/services/time';
import { VelaComponent } from '../visualizadores/vela/vela'; 
import { RelojArenaComponent } from '../visualizadores/reloj-arena/reloj-arena';
import { BarraDiaComponent } from '../visualizadores/barra-dia/barra-dia';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, VelaComponent, RelojArenaComponent, BarraDiaComponent], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  visualizadorActivo: string = 'vela';
  tiempoActual: any; 
  sliderValue: number = 0;
  private timeSub!: Subscription;

  constructor(
    private router: Router, 
    private timeService: TimeService
  ) {}

  ngOnInit() {
    
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      this.tiempoActual = time;
      this.sliderValue = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
    });
  }

  ngOnDestroy() {
    
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  setVisualizador(id: string) {
    this.visualizadorActivo = id;
  }

  onSliderChange(event: any) {
    const segundosTotales = event.target.value;
    this.timeService.setDemoTime(segundosTotales);
  }

  resetTime() {
    this.timeService.resetToRealTime();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}