export interface BracketsAPData {
  minAP: number
  maxAP: number
  extraAP: number | string
  diff: number
  total: number
}

export interface BracketsDPData {
  minDP: number
  maxDP: number
  extraDP: number | string
  diff: number
}
export interface BracketsDRData {
  minDR: number
  maxDR: number
  extraDR: number | string
  diff: number
}
// src/types/index.ts

export interface BracketsData {
  ap: APRow[]
  dp: DPRow[]
  dr: DRRow[]
}

export interface APRow {
  minAP: number
  maxAP: number
  low: number
  high: number
  bonus: number
  diff: number
  total: number
}

export interface DPRow {
  minDP: number
  maxDP: number
  low: number
  high: number
  bonus: number
  diff: number
  total?: number
}

export interface DRRow {
  minDR: number
  maxDR: number
  low: number
  high: number
  bonus: number
}
