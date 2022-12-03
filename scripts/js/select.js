export function addOption(select, value, text, selected = false) {
    let option = document.createElement('option');
    option.value = value.toString();
    option.text = text;
    option.selected = selected;
    select.add(option);
}
export function addOption2(select, data, selected = false) {
    let option = document.createElement('option');
    option.value = data.id.toString();
    option.text = data.name;
    option.setAttribute('data-price', data.price.toString());
    option.selected = selected;
    select.add(option);
}
export function addOptions(select, values, selectedValue = null) {
    for (let value of values) {
        if (typeof value === 'object') {
            addOption2(select, value, selectedValue !== null && value.id === selectedValue);
        }
        else {
            addOption(select, value, value.toString(), selectedValue !== null && value === selectedValue);
        }
    }
}
export function removeOptions(select, start = 0, end = -1) {
    let imax = end > -1 ? end : select.options.length - 1;
    for (let i = imax; i >= start; i--) {
        select.remove(i);
    }
}
export function removeOption(select, value) {
    let option = [...select.options].findIndex((option) => option.value === value.toString());
    select.remove(option);
}
