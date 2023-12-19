import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  subs: Subscription;
  players: Player[];

  constructor(private route: ActivatedRoute,
    private gameService: GameService,
    private storage: LocalStorageService) {
    
      this.subs = new Subscription;
  }

  quitGame(): void {
    this.gameService.quitGame();
  }

  ngOnInit(): void {
    this.subs.add(
      this.players = this.storage.getData()
    );
  }
}
