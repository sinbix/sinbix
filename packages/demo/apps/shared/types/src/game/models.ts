import { ID } from '@datorama/akita';
import { NumericDictionary, Dictionary } from 'lodash';

export interface IGame {
  id: ID;
  name: string;
  categories: IGameCategory[];
  merchant: IGameMerchant;
  image: string;
  step?: number;
}

export interface IGameCategory {
  id: ID;
  name: string;
}

export interface IGameMerchant {
  id: ID;
  name: string;
}

export interface IGamesApiData {
  categories: IGamesApiCategory[];
  games: IGamesApiGame[];
  merchants: NumericDictionary<IGamesApiMerchant>;
}

export interface IGamesApiCategory {
  ID: number;
  Name: Dictionary<string>;
}

export interface IGamesApiGame {
  ID: number;
  Name: Dictionary<string>;
  CategoryID: number[];
  MerchantID: number;
  ImageFullPath: string;
}

export interface IGamesApiMerchant {
  ID: number;
  Name: string;
  MenuId: string;
}
