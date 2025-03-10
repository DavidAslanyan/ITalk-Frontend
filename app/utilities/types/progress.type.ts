import { GamesEnum } from "../constants/game-titles";
import { StoreItemEnum } from "../enums/store-item.enum";

export type AddGameType = {
  gamePassed: GamesEnum;
}


export type SubtractCoinsType = {
  coins: number;
}

export type AddCoinsType = {
  coins: number;
}

export type PurchaseStoreItemType = {
  item: string;
  type: StoreItemEnum;
  coins: number;
}

