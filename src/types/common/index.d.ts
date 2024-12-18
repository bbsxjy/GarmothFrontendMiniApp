export interface TradeItem {
  href: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  disabled: boolean;
}

export interface TradeCategory {
  categoryName: string;
  data: TradeItem[];
}


export interface NavItem {
  path: string,
  label: string,
  imgSrc: string,
  imgAlt: string,
  disabled: boolean
}
