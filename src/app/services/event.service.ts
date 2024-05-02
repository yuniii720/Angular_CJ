import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private confirmEventSource = new Subject<void>();
  confirmEvent$ = this.confirmEventSource.asObservable();

  private confirmDialogSource = new Subject<any>();
  confirmDialog$ = this.confirmDialogSource.asObservable();

  constructor() { }

  emitConfirmEvent() {
    this.confirmEventSource.next();
  }

  emitConfirmDialogEvent(data: any) {
    this.confirmDialogSource.next(data);
  }
}
