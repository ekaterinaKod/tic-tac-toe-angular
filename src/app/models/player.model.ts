import { PlayerSymbol } from "./game.model";

export interface Player {
  name: string;
  symbol: PlayerSymbol;
  score: number;
}

export interface Game {
  gameNumber: number;
  winner: number;
}