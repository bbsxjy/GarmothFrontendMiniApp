interface Item {
  name: string;
  url: string;
  icon?: string;
}
export interface MarketSideMenu {
  name: string;
  icon: string;
  subcategories: Array<Item>;
  data?: any;
}