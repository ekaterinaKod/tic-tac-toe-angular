export enum PlayerSymbol {
  NONE = -1,
  O = 0,
  X = 1,
}

export interface GameWinner {
  won: boolean;
  diag?: number;
  row?: number;
  col?: number;
}
