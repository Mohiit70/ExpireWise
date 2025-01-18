import React, { useState } from 'react';
import { Upload, Calendar, DollarSign, Tag } from 'lucide-react';
import type { ProductFormData } from '../types';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    expiryDate: '',
    imageUrl: '',
    category: '',
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      expiryDate: '',
      imageUrl: '',
      category: '',
      price: 0,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '0' : e.target.value;
    setFormData({ ...formData, price: parseFloat(value) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Calendar className="inline-block w-4 h-4 mr-2" />
          Expiry Date
        </label>
        <input
          type="date"
          value={formData.expiryDate}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Upload className="inline-block w-4 h-4 mr-2" />
          Image URL
        </label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Tag className="inline-block w-4 h-4 mr-2" />
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="">Select a category</option>
          <option value="dairy">Dairy</option>
          <option value="produce">Produce</option>
          <option value="meat">Meat</option>
          <option value="pantry">Pantry</option>
          <option value="beverages">Beverages</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <DollarSign className="inline-block w-4 h-4 mr-2" />
          Price
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handlePriceChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      >
        Add Product
      </button>
    </form>
  );
}