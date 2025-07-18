export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 format
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  barcode: string;
  qrCode: string;
}

export interface SingleProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}
export interface ProductResponse {
  products: SingleProduct[];
  total: number;
  skip: number;
  limit: number;
}
