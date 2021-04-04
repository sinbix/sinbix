export type Breakpoint = string | number;

export type BreakpointMode = 'lt' | 'gt' | 'bw';

export type Range = [Breakpoint, Breakpoint];

export type BreakpointReq = Breakpoint | Range;

export interface ResponsiveBreakpoint {
  key: string;
  value: number;
}

export enum Side {
  Left,
  Right,
  Error,
}
