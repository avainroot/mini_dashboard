export interface IItems {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number,
  minW?: number,
  static?: boolean
}

export const itemsDefault: IItems[] = [
  // {i: 'add', x: 0, y: 0, w: 1, h: 1, static: true},
  {i: 'First', x: 0, y: 0, w: 3, h: 1, minW: 3},
  {i: 'Second', x: 3, y: 0, w: 5, h: 1, minW: 3},
  {i: 'Third', x: 3, y: 1, w: 5, h: 2, minW: 3}
]

export const operators = [
  { active: false },
  { active: true },
  { active: true },
  { active: true }
]