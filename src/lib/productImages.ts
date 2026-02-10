// Map DB image paths to bundled asset imports
import womenSweater from '@/assets/women-sweater.jpg';
import womenDress from '@/assets/women-dress.jpg';
import womenBlazer from '@/assets/women-blazer.jpg';
import womenTrousers from '@/assets/women-trousers.jpg';
import womenBag from '@/assets/women-bag.jpg';
import womenCoat from '@/assets/women-coat.jpg';
import womenHeels from '@/assets/women-heels.jpg';
import womenFlats from '@/assets/women-flats.jpg';
import womenWatch from '@/assets/women-watch.jpg';
import womenWatch2 from '@/assets/women-watch-2.jpg';
import womenSkincare from '@/assets/women-skincare.jpg';
import womenSkincare2 from '@/assets/women-skincare-2.jpg';
import menSuit from '@/assets/men-suit.jpg';
import menPolo from '@/assets/men-polo.jpg';
import menJacket from '@/assets/men-jacket.jpg';
import menShirt from '@/assets/men-shirt.jpg';
import menChinos from '@/assets/men-chinos.jpg';
import menSweater from '@/assets/men-sweater.jpg';
import menShoes from '@/assets/men-shoes.jpg';
import menSneakers from '@/assets/men-sneakers.jpg';
import menWatch from '@/assets/men-watch.jpg';
import menWatch2 from '@/assets/men-watch-2.jpg';
import menSkincare from '@/assets/men-skincare.jpg';
import menSkincare2 from '@/assets/men-skincare-2.jpg';

const imageMap: Record<string, string> = {
  '/assets/women-sweater.jpg': womenSweater,
  '/assets/women-dress.jpg': womenDress,
  '/assets/women-blazer.jpg': womenBlazer,
  '/assets/women-trousers.jpg': womenTrousers,
  '/assets/women-bag.jpg': womenBag,
  '/assets/women-coat.jpg': womenCoat,
  '/assets/women-heels.jpg': womenHeels,
  '/assets/women-flats.jpg': womenFlats,
  '/assets/women-watch.jpg': womenWatch,
  '/assets/women-watch-2.jpg': womenWatch2,
  '/assets/women-skincare.jpg': womenSkincare,
  '/assets/women-skincare-2.jpg': womenSkincare2,
  '/assets/men-suit.jpg': menSuit,
  '/assets/men-polo.jpg': menPolo,
  '/assets/men-jacket.jpg': menJacket,
  '/assets/men-shirt.jpg': menShirt,
  '/assets/men-chinos.jpg': menChinos,
  '/assets/men-sweater.jpg': menSweater,
  '/assets/men-shoes.jpg': menShoes,
  '/assets/men-sneakers.jpg': menSneakers,
  '/assets/men-watch.jpg': menWatch,
  '/assets/men-watch-2.jpg': menWatch2,
  '/assets/men-skincare.jpg': menSkincare,
  '/assets/men-skincare-2.jpg': menSkincare2,
};

export const resolveProductImage = (imagePath: string): string => {
  // If it's an external URL, use as-is
  if (imagePath.startsWith('http')) return imagePath;
  // Map to bundled asset
  return imageMap[imagePath] || imagePath;
};
