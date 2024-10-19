export interface Product {
  id: string;
  category?: Category;
  name: string;
  price: number;
  isFeatured: boolean;
  sizes: Size[];
  colors: Color[];
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
  storeId: string;
}

/* export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
} */

export interface Category {
  id: string;
  storeId: string;
  billboardId: string;
  // billboardLabel: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  roles: string; // Update this if UserRole is a specific type or enum
  createdAt: Date;
  updatedAt: Date;
}

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  image: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}
