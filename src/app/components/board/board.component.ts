import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameWinner, PlayerSymbol } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy {

  subs: Subscription;

  winner: GameWinner;
  board: PlayerSymbol[][] = [];
  players: Player[];

  constructor(public gameService: GameService,
    private storage: LocalStorageService) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(
      this.gameService.getBoard().subscribe(board => {
        this.board = board;
      })
    );

    this.subs.add(
      this.gameService.getGameWinner().subscribe(winner => {
        this.winner = winner;
      })
    );

    this.subs.add(
      this.storage.getPlayers().subscribe((player) => {
        this.players = player;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  isCardMarked(rowI: number, colI: number) {
    if (rowI === this.winner.row || colI === this.winner.col) {
      return true;
    }

    if (this.winner.diag === 0 && (rowI === colI)) {
      return true;
    }

    if (this.winner.diag === 1 && ((rowI === 0 && colI === 2) || (rowI === 1 && colI === 1) || (rowI === 2 && colI === 0))) {
      return true;
    }

    return false;
  }
}
