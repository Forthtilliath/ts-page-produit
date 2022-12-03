export const formatPrice = (price) => (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
export const sumPrices = (arr, basePrice) => arr.reduce((sum, price) => sum + price, basePrice);
export const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
