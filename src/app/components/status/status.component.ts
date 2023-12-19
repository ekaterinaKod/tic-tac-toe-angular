import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { GameWinner, PlayerSymbol } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit, OnDestroy {
  subs: Subscription;

  players: Player[];
  currPlayer!: Player;
  winner: GameWinner;

  constructor(
    private gameService: GameService,
    private storage: LocalStorageService
  ) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(
      this.gameService.getGameWinner().subscribe((winner) => {
        this.winner = winner;
      })
    );

    this.subs.add(
      this.storage.getPlayers().subscribe((players) => {
        this.players = players;
      })
    );

    this.subs.add(
      this.gameService.getPlayer().subscribe((symbol) => {
        this.currPlayer = this.players.find(
          (player) => player.symbol === symbol
        )!;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  resetGame(): void {
    this.gameService.resetBoard();
  }

  isBoardFull(): boolean {
    return this.gameService.isBoardFull();
  }
}
