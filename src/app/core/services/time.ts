import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
  isDemo: boolean;
}

@Injectable({
  providedIn: 'root' 
})
export class TimeService {
  private timer: any;
  private isDemoMode = false;

  // BehaviorSubject almacena la hora actual y va a todos los componentes
  private timeSubject = new BehaviorSubject<TimeState>(this.getCurrentRealTime());
  time$ = this.timeSubject.asObservable();

  constructor() {
    this.startRealTimeClock();
  }

  // Obtiene la hora real 
  private getCurrentRealTime(): TimeState {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      isDemo: this.isDemoMode
    };
  }

  
  private startRealTimeClock() {
    this.timer = setInterval(() => {
      
      if (!this.isDemoMode) {
        this.timeSubject.next(this.getCurrentRealTime());
      }
    }, 1000);
  }

  
  setDemoTime(totalSeconds: number) {
    this.isDemoMode = true;
    
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.timeSubject.next({
      hours,
      minutes,
      seconds,
      isDemo: true
    });
  }

 
  resetToRealTime() {
    this.isDemoMode = false;
    this.timeSubject.next(this.getCurrentRealTime());
  }
}