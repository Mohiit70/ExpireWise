export interface Product {
    id: string;
    name: string;
    expiryDate: string;
    imageUrl: string;
    category: string;
    price: number;
    addedAt: string;
  }
  
  export interface ProductFormData {
    name: string;
    expiryDate: string;
    imageUrl: string;
    category: string;
    price: number;
  }