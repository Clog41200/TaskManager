import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostgresqlService {
  constructor(private el: ElectronService, private zone: NgZone) {}

  Query(query: string, params?: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      const uuid = this.guid();
      this.el.ipcRenderer.once(uuid, (event, res) => {
        this.zone.run(() => {

          resolve(res);
        });
      });
      this.el.ipcRenderer.send('query', uuid, query, params);
    });
  }

  Listen(notificationName: string): Observable<any> {
    return new Observable(observer => {
      this.el.ipcRenderer.on(notificationName, (event, result) => {
        this.zone.run(() => {
          observer.next(result);
        });
      });
      this.el.ipcRenderer.send('listenPG', notificationName);
    });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }
}
