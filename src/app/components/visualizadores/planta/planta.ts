import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../core/services/time';

@Component({
  selector: 'app-planta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planta.html',
  styleUrls: ['./planta.css']
})
export class PlantaComponent implements OnInit, OnDestroy {
  private sub: Subscription | null = null;

  alturaTallo: number = 0; 
  tamanoFlor: number = 0;  
  inclinacionViento: number = 0; 

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    this.sub = this.timeService.time$.subscribe(t => {
      
      this.alturaTallo = 20 + (t.hours / 23) * 80; 

     
      this.tamanoFlor = 0.2 + (t.minutes / 59) * 0.8;

      
      this.inclinacionViento = Math.sin(t.seconds * (Math.PI / 30)) * 6; 
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}