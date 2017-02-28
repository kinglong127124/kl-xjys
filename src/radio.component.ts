import { Component, Input, Output, ElementRef, Renderer, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

export interface INgModel {
    isChecked: boolean;
    isDisabled?: boolean;
    readonly?: boolean;
    id: number,
    field?: string
}
@Component({
    selector: 'sksradio',
    template: `
        <span class="sks-radio" [ngClass]="{checked:curRadio?.isChecked, disabled: curRadio?.isDisabled, readonly: curRadio?.readonly}" (click)="selectRadio($event, curRadio)"></span><span 
       title="{{text}}">{{text}}</span>
    `,
    styles: [`
        :host{
            display:inline-block;
            vertical-align:middle;
        }
        :host .sks-radio {
            position: relative;
            display: inline-block;
            width: 28px;
            height: 28px;
            vertical-align: middle;
            margin-right: 5px;
            -webkit-border-radius: 25px;
            -moz-border-radius: 25px;
            border-radius: 25px;
            -moz-background-clip: padding;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            border: 1px solid rgba(84, 47, 2, 0.35);
            background: rgba(255, 255, 255, 0.7);
            text-align: left;
            box-sizing: border-box; }
            .sks-radio + span {
                line-height: 25px;
                vertical-align: middle;
                display: inline-block;
                width: calc(100% - 33px);
                width: -webkit-cacl(100% - 33px);
                width: -moz-cacl(100% - 33px);
                width: -o-cacl(100% - 33px);
                width: -ms-cacl(100% -33px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; }
            .sks-radio:hover, .sks-radio:focus {
                cursor: pointer;
                box-shadow: 0 0 10px rgba(179, 97, 4, 0.4) inset; }
            .sks-radio.checked::after {
                position: absolute;
                top: 2px;
                left: 1.18px;
                content: '';
                width: 18px;
                height: 18px;
                margin: 4px 3px;
                background: url('data:image/png;base64,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') -190px -117px; }
            .sks-radio.disabled {
                border-color: rgba(0, 0, 0, 0.05);
                background: rgba(0, 0, 0, 0.05); }
                .sks-radio.disabled:hover {
                cursor: default;
                box-shadow: none; }
    `]
})

export class RadioComponent {
    @Input() field: string;
    @Input() group: INgModel[];

    @Input() curRadio: INgModel;

    // private _curRadio: INgModel;
    // @Input() set curRadio(value: INgModel) {
    //     this.init(value);
    //     this._curRadio = value;
    // };
    // get curRadio(): INgModel {
    //     return this._curRadio;
    // }

    private _checkedRadio: INgModel;
    @Input() set checkedRadio(value: INgModel) {
        this.init(value);
        this._checkedRadio = value;
    }
    get checkedRadio() {
        return this._checkedRadio;
    }

    @Input() text: string;
    @Output() checkedRadioChange: EventEmitter<INgModel> = new EventEmitter<INgModel>(true);
    @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        // this.renderer.setElementClass(this.element.nativeElement, 'inline-block', true);

        Object.defineProperty(this.group, 'checked', { enumerable: false })
    }

    ngAfterViewInit() {

    }

    init(value) {
        let checkedItem: any;
        if (this.group['checked']) { return; }
        if (!value) {
            if (!this.group['checked']) {
                checkedItem = _.find(this.group, (v) => v.isChecked === true);
                if (!checkedItem) {
                    checkedItem = _.first(this.group);
                    checkedItem.isChecked = true;
                }
                this.group['checked'] = true;
            }
        } else {
            this.group['checked'] = true;
            let propertyName = this.field ? this.field : 'id';
            _.forEach(this.group, (v) => {
                v.isChecked = false;
                if (v[propertyName] === value[propertyName]) {
                    checkedItem = v;
                    v.isChecked = true;
                }
            })
            this.group['checked'] = true;
        }
        checkedItem && this.checkedRadioChange.emit(checkedItem);
        // console.log(this.group);
    }

    constructor(
        private element: ElementRef,
        private renderer: Renderer
    ) { }

    selectRadio(e, curRadio) {
        e.stopPropagation();
        if (curRadio.isDisabled || curRadio.notClick || curRadio.readonly) {
            return;
        }
        _.forEach(this.group, (v) => {
            if (curRadio !== v) {
                v.isChecked = false;
            }
        })
        curRadio.isChecked = true;
        this.checkedRadioChange.emit(curRadio);
        this.onChange.emit(curRadio);
    }

}