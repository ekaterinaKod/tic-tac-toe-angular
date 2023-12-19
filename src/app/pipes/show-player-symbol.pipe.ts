import { Pipe, PipeTransform } from '@angular/core';
import { PlayerSymbol } from '../models/game.model';

@Pipe({
  name: 'showPlayerSymbol'
})
export class ShowPlayerSymbolPipe implements PipeTransform {

  transform(value: PlayerSymbol): string | null {
    if (value === -1) {
      return null;
    };

    return value === 0 ? 'O' : 'X';
  }

}
