import { Injectable } from '@angular/core';
import { PlayerSymbol } from '../models/game.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private players = new BehaviorSubject<Player[]>([]);

  constructor() {}

  setData(data: Player[]) {
    let jsonData = JSON.stringify(data);
    localStorage.setItem('players', jsonData);
    this.players.next(data);
  }

  getData() {
    const getItem : string = localStorage.getItem('players')!; //not null
    const data = JSON.parse(getItem);
    this.players.next(data);
    return data;
  }

  removeData() {
    localStorage.removeItem('players');
    this.players.next([]);
  }

  clearAllData() {
    localStorage.clear();
    this.players.next([]);
  }

  getPlayers(): Observable<Player[]> {
    return this.players.asObservable();
  }
}
