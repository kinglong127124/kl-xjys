import { EventEmitter } from '@angular/core';
export declare class SwitchComponent {
    onOff: boolean;
    onOffChange: EventEmitter<boolean>;
    readonly: boolean;
    onChange: EventEmitter<boolean>;
    constructor();
    toggle: () => void;
}
