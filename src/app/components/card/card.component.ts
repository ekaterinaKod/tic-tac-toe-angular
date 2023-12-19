import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerSymbol } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnDestroy {
  @Input() value: PlayerSymbol;
  @Input() marked: boolean;
  @Output() onCardClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  subs: Subscription;
  currPlayer: PlayerSymbol;

  constructor(private gameService: GameService)  {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subs.add(
      this.gameService.getPlayer().subscribe((symbol) => {
        this.currPlayer = symbol;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onCardClick() {
    if (!this.marked)
      this.onCardClicked.emit(true);
  }
}
