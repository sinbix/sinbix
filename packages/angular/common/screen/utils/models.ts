export type ScreenOrientation = 'portrait' | 'landscape';

export interface Screen {
  width: number;
  height: number;
  orientation: ScreenOrientation;
}
