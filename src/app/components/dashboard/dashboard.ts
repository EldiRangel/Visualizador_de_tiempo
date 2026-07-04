import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/services/time'; 
import { VelaComponent } from '../visualizadores/vela/vela'; 
import { RelojArenaComponent } from '../visualizadores/reloj-arena/reloj-arena';
import { BarraDiaComponent } from '../visualizadores/barra-dia/barra-dia';
import { SistemaSolarComponent } from '../visualizadores/sistema-solar/sistema-solar';
import { PlantaComponent } from '../visualizadores/planta/planta';
import { PenduloComponent } from '../visualizadores/pendulo/pendulo';
import { FractalesComponent } from '../visualizadores/fractales/fractales';
import { ClepsidraComponent } from '../visualizadores/clepsidra/clepsidra';
import { CicloLunarComponent } from '../visualizadores/ciclo-lunar/ciclo-lunar';
import { MatrizPixelesComponent } from '../visualizadores/matriz-pixeles/matriz-pixeles';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, VelaComponent, RelojArenaComponent, BarraDiaComponent,
    SistemaSolarComponent, PlantaComponent, PenduloComponent,
    FractalesComponent, ClepsidraComponent, CicloLunarComponent, MatrizPixelesComponent
  ], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  visualizadorActivo: string = 'solar'; 
  tiempoActual: any;
  sliderValue: number = 0;
  isDragging: boolean = false; 
  private timeSub!: Subscription;

  constructor(
    private router: Router, 
    private timeService: TimeService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe((time: any) => {
      this.tiempoActual = time;
      
      
      if (!this.isDragging) {
        this.sliderValue = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
      }
      
      
      this.cdr.detectChanges(); 
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  setVisualizador(id: string) {
    this.visualizadorActivo = id;
  }

  
  onSliderInput(event: Event) {
    this.isDragging = true; 
    const target = event.target as HTMLInputElement;
    const segundosTotales = Number(target.value);
    this.timeService.setDemoTime(segundosTotales);
  }

  
  onSliderChange(event: Event) {
    this.isDragging = false; 
  }

  resetTime() {
    this.timeService.resetToRealTime();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}