/**
 * It takes a number, divides it by 100, and returns a string formatted as a French Euro currency
 * @param {number} price - number - Price in centimes
 */
export const formatPrice = (price: number) =>
    (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

/**
 * It takes an array of numbers and a base price, and returns the sum of the numbers in the array plus
 * the base price
 * @param {number[]} arr - number[] - an array of numbers
 * @param {number} basePrice - The base price of the item.
 */
export const sumPrices = (arr: number[], basePrice: number) => arr.reduce((sum, price) => sum + price, basePrice);

/**
 * Sleep is a function that takes a number and returns a promise that resolves after the given number
 * of milliseconds.
 * @param {number} duration - The amount of time to wait in milliseconds.
 */
export const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));
