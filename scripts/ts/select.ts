/**
 * Ajoute un élément option au menu select
 * @param {String|number} value Valeur de l'élément option
 * @param {String} text Contenu de l'élément option
 * @param {boolean} selected Option séléectionnée ou non
 */
export function addOption(select: HTMLSelectElement, value: string | number, text: string, selected: boolean = false) {
    let option = document.createElement('option') as HTMLOptionElement;
    option.value = value.toString();
    option.text = text;
    option.selected = selected;
    select.add(option);
}

declare interface IData {
    id: number;
    name: string;
    price: number;
}

export function addOption2(select: HTMLSelectElement, data: IData, selected: boolean = false) {
    let option = document.createElement('option') as HTMLOptionElement;
    option.value = data.id.toString();
    option.text = data.name;
    option.setAttribute('data-price', data.price.toString());
    option.selected = selected;
    select.add(option);
}

/**
 * Ajoute un tableau d'éléments en option au menu select
 * @param {String[]} values Tableau de valeurs
 */
export function addOptions(
    select: HTMLSelectElement,
    values: string[] | number[] | IData[],
    selectedValue: string | number | null = null,
) {
    for (let value of values) {
        if (typeof value === 'object') {
            addOption2(select, value, selectedValue !== null && value.id === selectedValue);
        } else {
            addOption(select, value, value.toString(), selectedValue !== null && value === selectedValue);
        }
    }
}

/**
 * Supprime les options d'un menu select
 * @param {number} start Index du premier option à supprimer
 * @param {number} end Index du dernier option à supprimer
 */
export function removeOptions(select: HTMLSelectElement, start: number = 0, end: number = -1) {
    let imax = end > -1 ? end : select.options.length - 1;
    for (let i = imax; i >= start; i--) {
        select.remove(i);
    }
}

export function removeOption(select: HTMLSelectElement, value: string | number) {
    let option = [...select.options].findIndex((option) => option.value === value.toString());
    select.remove(option);
}
