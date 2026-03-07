import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProductImage {
  id: string;
  color: string;
  image_url: string;
  sort_order: number;
}

interface ProductColorImagesProps {
  productId: string;
  mainImage: string;
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  productName: string;
}

const ProductColorImages = ({
  productId,
  mainImage,
  colors,
  selectedColor,
  onColorSelect,
  productName,
}: ProductColorImagesProps) => {
  const [colorImages, setColorImages] = useState<ProductImage[]>([]);
  const [activeImage, setActiveImage] = useState(mainImage);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });
      if (data) setColorImages(data as ProductImage[]);
    };
    fetchImages();
  }, [productId]);

  useEffect(() => {
    // When color changes, find matching image
    const match = colorImages.find(img => img.color.toLowerCase() === selectedColor.toLowerCase());
    setActiveImage(match ? match.image_url : mainImage);
  }, [selectedColor, colorImages, mainImage]);

  const allImages = [
    { id: 'main', image_url: mainImage, color: '' },
    ...colorImages,
  ];

  // Remove duplicate main image
  const uniqueImages = allImages.filter((img, i, arr) =>
    i === arr.findIndex(a => a.image_url === img.image_url)
  );

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={activeImage}
          alt={productName}
          className="w-full aspect-[3/4] object-cover transition-all duration-500"
          loading="eager"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Thumbnail strip */}
      {uniqueImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {uniqueImages.map((img) => (
            <button
              key={img.id}
              onClick={() => {
                setActiveImage(img.image_url);
                if (img.color) onColorSelect(img.color);
              }}
              className={`flex-shrink-0 w-16 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                activeImage === img.image_url ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={img.image_url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Color buttons */}
      <div>
        <span className="text-sm font-medium block mb-2">Color: {selectedColor}</span>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const hasImage = colorImages.some(img => img.color.toLowerCase() === color.toLowerCase());
            return (
              <button
                key={color}
                onClick={() => onColorSelect(color)}
                className={`px-4 py-2 border text-sm transition-all rounded-md ${
                  selectedColor === color
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                } ${hasImage ? 'ring-1 ring-accent/30' : ''}`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductColorImages;
