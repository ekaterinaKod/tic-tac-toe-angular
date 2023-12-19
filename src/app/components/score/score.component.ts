import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameWinner, PlayerSymbol } from 'src/app/models/game.model';
import { Game, Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnDestroy {
  readonly scoreResults = PlayerSymbol;
  subs: Subscription;
  players: Player[];
  winner: GameWinner;
  currPlayer: PlayerSymbol = PlayerSymbol.NONE;

  games: Game[] = [];

  constructor(
    private storage: LocalStorageService,
    private gameService: GameService
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
        this.currPlayer = symbol;
      })
    );

    this.subs.add(
      this.gameService.getGameScore().subscribe((score) => {
        this.games = [];
        this.gameService
          .getGameScore()
          .subscribe((score2) => {
            this.games.push(score2);
          })
          .unsubscribe();
      })
    );
    this.players = this.storage.getData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
