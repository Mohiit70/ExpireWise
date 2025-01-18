import React from 'react';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';
import { Leaf } from 'lucide-react';
import type { Product, ProductFormData } from '../types';

export function Dashboard() {
  const [products, setProducts] = React.useState<Product[]>([]);

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      ...formData,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">ExpireWise</h1>
            </div>
            <p className="text-sm text-gray-500">Reduce Waste, Save Money</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <ProductForm onSubmit={handleAddProduct} />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Your Products</h2>
            <ProductList products={products} onDelete={handleDeleteProduct} />
          </div>
        </div>
      </main>
    </div>
  );
}