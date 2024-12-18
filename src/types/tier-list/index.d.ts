export interface ClassItem {
  id: number
  name: string
  specialization: string
  imageUrl: string
  tier: string
  status?: 'extremeHot' | 'superHot' | 'hot' | 'fewHours'
}

export interface Tier {
  name: string
  colorClass: string
}

export interface TierItems {
  [tierName: string]: ClassItem[]
}

export interface TierListProps {
  initialClassItems: ClassItem[]
  tiers: Tier[]
  title: string
}
