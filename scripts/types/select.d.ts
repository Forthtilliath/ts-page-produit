export declare function addOption(select: HTMLSelectElement, value: string | number, text: string, selected?: boolean): void;
declare interface IData {
    id: number;
    name: string;
    price: number;
}
export declare function addOption2(select: HTMLSelectElement, data: IData, selected?: boolean): void;
export declare function addOptions(select: HTMLSelectElement, values: string[] | number[] | IData[], selectedValue?: string | number | null): void;
export declare function removeOptions(select: HTMLSelectElement, start?: number, end?: number): void;
export declare function removeOption(select: HTMLSelectElement, value: string | number): void;
export {};
