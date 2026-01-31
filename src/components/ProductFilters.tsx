import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterState } from '@/types/product';

interface ProductFiltersProps {
  subcategories: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableSizes: string[];
  availableColors: string[];
}

const ProductFilters = ({
  subcategories,
  filters,
  onFilterChange,
  availableSizes,
  availableColors,
}: ProductFiltersProps) => {
  const [openSection, setOpenSection] = useState<string | null>('category');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    updateFilter('sizes', newSizes);
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    updateFilter('colors', newColors);
  };

  const clearFilters = () => {
    onFilterChange({
      subcategory: null,
      priceRange: [0, 1000],
      sizes: [],
      colors: [],
      inStock: false,
    });
  };

  const hasActiveFilters = 
    filters.subcategory || 
    filters.sizes.length > 0 || 
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  return (
    <div className="w-full lg:w-64 space-y-4">
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-accent hover:underline"
        >
          <X size={14} /> Clear all filters
        </button>
      )}

      {/* Category Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Category
          <ChevronDown
            size={16}
            className={`transition-transform ${openSection === 'category' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'category' && (
          <div className="mt-2 space-y-2">
            <button
              onClick={() => updateFilter('subcategory', null)}
              className={`block text-sm ${!filters.subcategory ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => updateFilter('subcategory', sub)}
                className={`block text-sm capitalize ${
                  filters.subcategory === sub ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Price
          <ChevronDown
            size={16}
            className={`transition-transform ${openSection === 'price' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'price' && (
          <div className="mt-4 px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              max={1000}
              min={0}
              step={10}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Size
          <ChevronDown
            size={16}
            className={`transition-transform ${openSection === 'size' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'size' && (
          <div className="mt-2 flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-xs border transition-colors ${
                  filters.sizes.includes(size)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Color
          <ChevronDown
            size={16}
            className={`transition-transform ${openSection === 'color' ? 'rotate-180' : ''}`}
          />
        </button>
        {openSection === 'color' && (
          <div className="mt-2 space-y-2">
            {availableColors.map((color) => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.colors.includes(color)}
                  onCheckedChange={() => toggleColor(color)}
                />
                <span className="text-sm">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
