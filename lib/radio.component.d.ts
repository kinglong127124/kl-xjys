import { ElementRef, Renderer, EventEmitter } from '@angular/core';
export interface INgModel {
    isChecked: boolean;
    isDisabled?: boolean;
    readonly?: boolean;
    id: number;
    field?: string;
}
export declare class RadioComponent {
    private element;
    private renderer;
    field: string;
    group: INgModel[];
    curRadio: INgModel;
    private _checkedRadio;
    checkedRadio: INgModel;
    text: string;
    checkedRadioChange: EventEmitter<INgModel>;
    onChange: EventEmitter<boolean>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    init(value: any): void;
    constructor(element: ElementRef, renderer: Renderer);
    selectRadio(e: any, curRadio: any): void;
}
