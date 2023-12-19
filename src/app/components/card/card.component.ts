import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerSymbol } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() value: PlayerSymbol;
  @Input() marked: boolean;
  @Output() onCardClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {

  }

  onCardClick() {
    if (!this.marked)
      this.onCardClicked.emit(true);
  }
}
