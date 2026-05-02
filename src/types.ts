export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export interface LinkCard {
  id: string;
  name: string;
  url: string;
  iconName: string;
  categoryId: string;
}

export interface DbCategory {
  id: string;
  name: string;
  icon_name: string;
}

export interface DbLinkCard {
  id: string;
  name: string;
  url: string;
  icon_name: string;
  category_id: string;
}