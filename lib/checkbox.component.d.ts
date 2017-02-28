import { ElementRef, Renderer, EventEmitter } from '@angular/core';
export declare class CheckboxComponent {
    private element;
    private renderer;
    model: boolean;
    modelChange: EventEmitter<boolean>;
    onChange: EventEmitter<boolean>;
    isDisabled: boolean;
    text: string;
    tabIndex: number;
    isNotClick: boolean;
    readonly: boolean;
    constructor(element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    keyDownEvent(event: any): boolean;
}
