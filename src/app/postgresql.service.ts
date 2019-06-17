import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class PostgresqlService {
  public ws: WebSocket;

  private queryCallback: any[];
  private notificationCallback: any;

  constructor(private zone: NgZone) {
    this.queryCallback = [];
    this.notificationCallback = {};

    this.ws = new WebSocket('ws://' + window.location.hostname + ':8181');
    this.ws.onopen = ev => {
      this.ws.send(JSON.stringify(ev));
    };

    this.ws.onmessage = ev => {
      const objetRetour = JSON.parse(ev.data);

      if (objetRetour.type == 'query') {
        const uuid = objetRetour.queryID;

        const querycallback = this.queryCallback.findIndex(val => {
          if (val.queryID == uuid) {
            return true;
          }
        });

        if (querycallback != -1) {
          this.queryCallback[querycallback].callback(objetRetour.results);
          this.queryCallback.splice(querycallback, 1);
        }
      }

      if (objetRetour.type == 'notification') {
        const name = objetRetour.name;
        if (this.notificationCallback[name]) {
          this.notificationCallback[name](objetRetour.results);
        }
      }
    };
  }

  Query(query: string, params?: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      const uuid = this.guid();

      this.queryCallback.push({
        queryID: uuid,
        callback: res => {
          resolve(res);
        }
      });

      this.ws.send(
        JSON.stringify({
          type: 'query',
          query: query,
          args: params,
          queryID: uuid
        })
      );

      // this.el.ipcRenderer.once(uuid, (event, res) => {
      //   this.zone.run(() => {
      //     resolve(res);
      //   });
      // });
      // this.el.ipcRenderer.send('query', uuid, query, params);
    });
  }

  Listen(notificationName: string): Observable<any> {
    return new Observable(observer => {
      this.notificationCallback[notificationName] = res => {
        this.zone.run(() => {
          observer.next(res);
        });
      };

      this.ws.send(
        JSON.stringify({
          type: 'notification',
          name: notificationName
        })
      );
      // this.el.ipcRenderer.on(notificationName, (event, result) => {
      //   this.zone.run(() => {
      //     observer.next(result);
      //   });
      // });
      // this.el.ipcRenderer.send('listenPG', notificationName);
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
