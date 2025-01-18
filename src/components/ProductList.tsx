import { Clock, AlertTriangle } from 'lucide-react';
import type { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductList({ products, onDelete }: ProductListProps) {
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (daysLeft: number) => {
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 7) return 'warning';
    return 'good';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const daysLeft = getDaysUntilExpiry(product.expiryDate);
        const status = getExpiryStatus(daysLeft);

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 mr-1" />
                <span
                  className={`text-sm ${
                    status === 'expired'
                      ? 'text-red-500'
                      : status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  {daysLeft < 0
                    ? 'Expired'
                    : daysLeft === 0
                    ? 'Expires today'
                    : `${daysLeft} days left`}
                </span>
              </div>

              {status === 'warning' && (
                <div className="flex items-center text-yellow-500 text-sm mb-2">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  <span>Use soon!</span>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 capitalize">
                  {product.category}
                </span>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}