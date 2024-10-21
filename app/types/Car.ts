export interface Car {
  id: number;
  x: number;
  y: number;
  length: number;
  orientation: 'horizontal' | 'vertical';
  isMain: boolean;
}