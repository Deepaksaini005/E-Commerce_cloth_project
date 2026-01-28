import { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();

  const handleQuickAdd = () => {
    addToCart(product, selectedSize, product.colors[0]);
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${selectedSize}`,
    });
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
        <div className="product-card-overlay" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground px-3 py-1 text-xs tracking-wider uppercase">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-accent text-accent-foreground px-3 py-1 text-xs tracking-wider uppercase">
              Sale
            </span>
          )}
        </div>

        {/* Quick Add */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-4 transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex gap-2 mb-3">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-2 text-xs border transition-colors ${
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-primary text-primary-foreground text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4">
        <h3 className="font-medium text-sm md:text-base">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
          <span className={`${product.isSale ? 'text-accent' : ''} font-medium`}>
            ${product.price}
          </span>
        </div>
        <div className="flex gap-1 mt-2">
          {product.colors.map((color, index) => (
            <span key={index} className="text-xs text-muted-foreground">
              {color}
              {index < product.colors.length - 1 && ' /'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
