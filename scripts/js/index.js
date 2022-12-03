var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as data from './datas.js';
import { formatPrice, sleep, sumPrices } from './lib.js';
import * as Select from './select.js';
const normalPrice = 50000;
const promoPrice = 19990;
const basePrice = promoPrice || normalPrice;
const selectSuit = document.querySelector('#select_suits');
const selectDurations = document.querySelector('#select_durations');
const selectActivities = document.querySelector('#select_activities');
const priceTotal = document.querySelector('#priceTotal');
const selects = [selectSuit, selectDurations, selectActivities];
const tabIds = ['select_suits', 'select_durations', 'select_activities'];
const getIndexId = (id) => tabIds.indexOf(id);
let tabPrices = new Array(3);
Select.addOptions(selectSuit, data.suits);
Select.addOptions(selectDurations, data.durations);
Select.addOptions(selectActivities, data.activities);
selects.forEach((select) => select.addEventListener('change', setPrice));
function setPrice(e) {
    var _a;
    const select = e.target;
    const optionSelected = select.options[select.selectedIndex];
    const priceSpan = select.nextElementSibling.querySelector('.formElement__price-value');
    const price = parseInt((_a = optionSelected.getAttribute('data-price')) !== null && _a !== void 0 ? _a : '0', 10);
    tabPrices[getIndexId(select.id)] = price;
    priceSpan.innerText = formatPrice(price);
    priceTotal.innerText = formatPrice(sumPrices(tabPrices, basePrice));
}
const productPriceNormal = document.querySelector('.price__base');
const productPricePromo = document.querySelector('.price__promo');
const errorElement = document.querySelector('.errorElement__message');
productPriceNormal.innerText = formatPrice(normalPrice);
productPricePromo.innerText = formatPrice(promoPrice);
priceTotal.innerText = formatPrice(promoPrice);
const form = document.querySelector('form');
const sound = new Audio('./sounds/hum.mp3');
const notification = document.querySelector('.notification');
const notif_btn_close = notification.querySelector('.btn__close');
const addToCart = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (selects.some((s) => s.value === '0')) {
        errorElement.removeAttribute('hidden');
        return;
    }
    errorElement.setAttribute('hidden', '');
    sound.play();
    showNotification();
    yield sleep(3000);
    closeNotification();
});
form.addEventListener('submit', addToCart);
notif_btn_close.addEventListener('click', closeNotification);
function showNotification() {
    notification.classList.add('visible');
}
function closeNotification() {
    notification.classList.remove('visible');
}
const images = document.querySelectorAll('.image');
const thumbs = document.querySelectorAll('.thumb');
const changeImage = (index) => {
    thumbs.forEach((thumb) => thumb.classList.remove('active'));
    images.forEach((image) => image.classList.remove('active'));
    images[index].classList.add('active');
    thumbs[index].classList.add('active');
};
thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => changeImage(i)));
changeImage(0);
