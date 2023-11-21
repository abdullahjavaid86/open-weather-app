export type Unit = 'imperial' | 'metric' | 'standard';
export type Time = '12h' | '24h';

export interface Coordinate {
  lon: number;
  lat: number;
}
