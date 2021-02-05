import { Bunch } from "./common";

export interface Dictionary<T> {
  [index: string]: T;
}

export interface NumericDictionary<T> {
  [index: number]: T;
}

export type CssClasses = Bunch<string>;

export interface NavItem {
  title: string;
  icon?: string;
  badge?: {
    title: string;
    classes: string;
  };
  hidden?: boolean;
  url?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  children?: NavItem[];
  function?: any;
}
