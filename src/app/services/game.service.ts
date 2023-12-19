import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, pipe, take, switchMap } from 'rxjs';
import { GameWinner, PlayerSymbol } from '../models/game.model';
import { Game, Player } from '../models/player.model';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private board: PlayerSymbol[][] = [];
  private player: PlayerSymbol = PlayerSymbol.NONE;
  gameScore: ReplaySubject<Game>;

  private boardSubject: BehaviorSubject<PlayerSymbol[][]>;
  private playerSubject: BehaviorSubject<PlayerSymbol>;
  private winnerSubject: BehaviorSubject<GameWinner>;

  constructor(
    private storageService: LocalStorageService,
    private router: Router
  ) {
    this.boardSubject = new BehaviorSubject<PlayerSymbol[][]>(this.board);
    this.playerSubject = new BehaviorSubject<PlayerSymbol>(this.player);
    this.winnerSubject = new BehaviorSubject<GameWinner>({won: false});
    this.gameScore = new ReplaySubject<Game>(5);
    this.resetBoard();
    this.playerSubject.next(this.player);

  }

  getGameScore(): Observable<Game> {
    return this.gameScore.asObservable();
  }

  setGameScore(score: Game): void {
    this.gameScore.next(score);
  } 

  getBoard(): Observable<PlayerSymbol[][]> {
    return this.boardSubject.asObservable();
  }

  getPlayer(): Observable<PlayerSymbol> {
    return this.playerSubject.asObservable();
  }

  getGameWinner(): Observable<GameWinner> {
    return this.winnerSubject.asObservable();
  }

  placeMark(row: number, col: number) {
    if (this.board[row][col] !== PlayerSymbol.NONE || this.winnerSubject.value.won) {
      return;
    }
    this.board[row][col] = this.player;
    this.boardSubject.next(this.board);

    if (this.checkWinner()) {
      return;
    }

    this.player = (this.player === PlayerSymbol.O) ? PlayerSymbol.X : PlayerSymbol.O;
    this.playerSubject.next(this.player);
  }

  checkWinner(): boolean {

    let winner: GameWinner = {won: false, diag: -1, row: -1, col: -1};

    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.player && this.board[i][1] === this.player && this.board[i][2] === this.player) {
        winner = {...winner, row: i, won: true};
        this.setGameWinner(winner, this.player);
        return true;
      }

      if (this.board[0][i] === this.player && this.board[1][i] === this.player && this.board[2][i] === this.player) {
        winner = {...winner, col: i, won: true};
        this.setGameWinner(winner, this.player);
        return true;
      }
    }

    if (this.board[0][0] === this.player && this.board[1][1] === this.player && this.board[2][2] === this.player) {
      winner = {...winner, diag: 0, won: true};
      this.setGameWinner(winner, this.player);
      return true;
    }

    if (this.board[0][2] === this.player && this.board[1][1] === this.player && this.board[2][0] === this.player) {
      winner = {...winner, diag: 1, won: true};
      this.setGameWinner(winner, this.player);
      return true;
    }

    if(this.isBoardFull()) {
      this.setGameWinner({won: false}, PlayerSymbol.NONE);
    }

    return false;
  }

  private setGameWinner(winner: GameWinner, playerSymbol: PlayerSymbol) {
    this.winnerSubject.next(winner);

    let gamesPlayed = 0;
    this.gameScore.pipe(take(1)).subscribe(obj => {
      gamesPlayed = obj.gameNumber;
    });

    const currentPlayers = this.storageService.getData();
    const updatedPlayers: Player[] = currentPlayers.map((player: Player) => {
      if (player.symbol === playerSymbol) {
        return { ...player, score: player.score + 1 };
      } else {
        return player;
      }
    });
    this.storageService.setData(updatedPlayers);

    this.setGameScore({
      gameNumber: gamesPlayed + 1,
      winner: playerSymbol
    });
  }

  isBoardFull(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === PlayerSymbol.NONE ) {
          return false;
        }
      }
    }
    return true;
  }

  resetBoard(): void {
    this.board = [
      [PlayerSymbol.NONE, PlayerSymbol.NONE, PlayerSymbol.NONE],
      [PlayerSymbol.NONE, PlayerSymbol.NONE, PlayerSymbol.NONE],
      [PlayerSymbol.NONE, PlayerSymbol.NONE, PlayerSymbol.NONE]
    ];
    this.player = PlayerSymbol.X;

    this.boardSubject.next(this.board);
    this.winnerSubject.next({won: false});
    //this.playerSubject.next(this.player);
  }

  quitGame(): void {
    this.resetBoard();
    this.playerSubject.next(this.player);
    this.storageService.clearAllData();
    this.router.navigate(['/']);
    this.gameScore = new ReplaySubject(5);
  }
}
