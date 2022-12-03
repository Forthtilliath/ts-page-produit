import * as data from './datas.js';
import { formatPrice, sleep, sumPrices } from './lib.js';
import * as Select from './select.js';

// Prix en centimes
const normalPrice = 50000;
const promoPrice = 19990;
const basePrice = promoPrice || normalPrice;

//*************************************\
//* MENUS SELECT                       *
//*************************************/

const selectSuit = document.querySelector('#select_suits') as HTMLSelectElement;
const selectDurations = document.querySelector('#select_durations') as HTMLSelectElement;
const selectActivities = document.querySelector('#select_activities') as HTMLSelectElement;
const priceTotal = document.querySelector('#priceTotal') as HTMLDivElement;
const selects = [selectSuit, selectDurations, selectActivities];

const tabIds = ['select_suits', 'select_durations', 'select_activities'];
const getIndexId = (id: string) => tabIds.indexOf(id);

let tabPrices = new Array<number>(3);

Select.addOptions(selectSuit, data.suits);
Select.addOptions(selectDurations, data.durations);
Select.addOptions(selectActivities, data.activities);

selects.forEach((select) => select.addEventListener('change', setPrice));

function setPrice(e: Event) {
    const select = e.target as HTMLSelectElement;
    const optionSelected = select.options[select.selectedIndex];
    const priceSpan = select.nextElementSibling!.querySelector('.formElement__price-value') as HTMLSpanElement;
    const price = parseInt(optionSelected.getAttribute('data-price') ?? '0', 10);
    tabPrices[getIndexId(select.id)] = price;
    priceSpan.innerText = formatPrice(price);
    priceTotal.innerText = formatPrice(sumPrices(tabPrices, basePrice));
}

//*************************************\
//* INITIALISATION PRIX                *
//*************************************/

const productPriceNormal = document.querySelector<HTMLDivElement>('.price__base')!;
const productPricePromo = document.querySelector<HTMLDivElement>('.price__promo')!;
const errorElement = document.querySelector<HTMLParagraphElement>('.errorElement__message')!;

productPriceNormal.innerText = formatPrice(normalPrice);
productPricePromo.innerText = formatPrice(promoPrice);
priceTotal.innerText = formatPrice(promoPrice);

//*************************************\
//* SUBMIT                             *
//*************************************/

const form = document.querySelector('form')!;
const sound = new Audio('./sounds/hum.mp3');
const notification = document.querySelector('.notification')!;
const notif_btn_close = notification.querySelector('.btn__close')!;

const addToCart = async (e: Event) => {
    e.preventDefault();

    if (selects.some((s) => s.value === '0')) {
        errorElement.removeAttribute('hidden');
        return;
    }

    errorElement.setAttribute('hidden', '');
    sound.play();
    showNotification();
    await sleep(3000);
    closeNotification();
};

form.addEventListener('submit', addToCart);
notif_btn_close.addEventListener('click', closeNotification);

function showNotification() {
    notification.classList.add('visible');
}
function closeNotification() {
    notification.classList.remove('visible');
}
//*************************************\
//* SLIDER                             *
//*************************************/

const images = document.querySelectorAll('.image');
const thumbs = document.querySelectorAll('.thumb');

const changeImage = (index: number) => {
    thumbs.forEach((thumb) => thumb.classList.remove('active'));
    images.forEach((image) => image.classList.remove('active'));
    images[index].classList.add('active');
    thumbs[index].classList.add('active');
};

thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => changeImage(i)));

changeImage(0);
