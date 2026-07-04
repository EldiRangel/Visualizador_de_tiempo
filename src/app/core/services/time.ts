import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isDemo: boolean;
  totalSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {
  private timeSubject = new BehaviorSubject<TimeState>(this.getCurrentRealTime());
  public time$ = this.timeSubject.asObservable();

  private ticker: any;
  private isDemoMode = false;
  private demoBaseMs = 0;
  private realTimeAtDemoStart = 0;

  constructor() {
   
    this.ticker = setInterval(() => {
      this.tick();
    }, 50);
  }

  private tick() {
    const now = Date.now();
    
    if (!this.isDemoMode) {
      this.timeSubject.next(this.getCurrentRealTime());
    } else {
      
      const elapsedMs = now - this.realTimeAtDemoStart;
      let currentDemoMs = this.demoBaseMs + elapsedMs;

      
      const msInDay = 86400000;
      currentDemoMs = currentDemoMs % msInDay;
      if (currentDemoMs < 0) currentDemoMs += msInDay; 

      this.timeSubject.next(this.formatTimeFromMs(currentDemoMs, true));
    }
  }

  private getCurrentRealTime(): TimeState {
    const d = new Date();
    const totalSecs = (d.getHours() * 3600) + (d.getMinutes() * 60) + d.getSeconds();
    return {
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
      milliseconds: d.getMilliseconds(),
      isDemo: false,
      totalSeconds: totalSecs + (d.getMilliseconds() / 1000)
    };
  }

  private formatTimeFromMs(msTotal: number, isDemo: boolean): TimeState {
    const totalSecondsFloor = Math.floor(msTotal / 1000);
    const hours = Math.floor(totalSecondsFloor / 3600);
    const minutes = Math.floor((totalSecondsFloor % 3600) / 60);
    const seconds = totalSecondsFloor % 60;
    const milliseconds = Math.floor(msTotal % 1000);

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
      isDemo,
      totalSeconds: totalSecondsFloor + (milliseconds / 1000)
    };
  }

  setDemoTime(segundosTotales: number) {
    this.isDemoMode = true;
    this.demoBaseMs = segundosTotales * 1000;
    this.realTimeAtDemoStart = Date.now(); 
    this.tick(); 
  }

  resetToRealTime() {
    this.isDemoMode = false;
    this.tick();
  }

  ngOnDestroy() {
    if (this.ticker) clearInterval(this.ticker);
  }
}