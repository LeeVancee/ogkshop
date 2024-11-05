export interface BillboardColumn {
  id: string;
  label: string;
  createdAt: string;
}

export interface CategoryColumn {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export interface ColorColumn {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface SizeColumn {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

/* export interface ProductColumn {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  size: string;
} */

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: string;
};

export interface OrderColumn {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
}

export interface GraphData {
  name: string;
  total: number;
}
