import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'sksselect',
    template: `   
        <div class="sks-select" [ngClass]="{'show-panel':optionsShow}" tabindex="-1" (blur)="hidePanel($event)">
            <div *ngIf="isTranslate" class="cur-option single-ellipsis" [ngStyle]="{'line-height': cHeight + 'px'}" [ngClass]="{'active': optionsShow, 'disabled': isDisabled, 'readonly': readonly}" (click)="toggleOptionsPanel()" title="{{selected?.name | translate}}">{{ selected?.name | translate }}</div>
            <div *ngIf="!isTranslate" class="cur-option single-ellipsis" [ngStyle]="{'line-height': cHeight + 'px'}" [ngClass]="{'active': optionsShow, 'disabled': isDisabled, 'readonly': readonly}" (click)="toggleOptionsPanel()" title="{{selected?.name | translate}}">{{ selected?.name | translate }}</div>
            <div class="options-panel" (click)="hidePanel()" [ngStyle]="{top: cHeight - 2 + 'px'}">
                <ul class="options-wrapper">
                    <template ngFor let-opt [ngForOf]="options">
                        <li *ngIf="optionsShow && !isTranslate" class="single-ellipsis" [ngStyle]="{'line-height': cHeight - 2 + 'px'}" (click)="manualChange(opt)" title="{{ opt.title }}">{{ opt.name }}</li>
                        <li *ngIf="optionsShow && isTranslate" class="single-ellipsis" [ngStyle]="{'line-height': cHeight - 2 + 'px'}" (click)="manualChange(opt)" title="{{ opt.title }}">{{ opt.name | translate }}</li>
                    </template>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: inline-block;
            vertical-align: middle;
            padding: 0;
        }
        .sks-select {
            font-size: 12px;
            position: relative;
            width: 100%;
            outline: none; }
            .sks-select:hover {
                cursor: pointer; }
            .sks-select.show-panel .options-panel {
                display: block; }
            .sks-select.show-panel .cur-option:after {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg); }
            .sks-select .options-panel {
                position: absolute;
                z-index: 100;
                width: 100%;
                display: none;
                background: #fff;
                border-radius: 0 0 5px 5px;
                -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                -moz-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                max-height: 300px;
                overflow-y: auto;
                border-top: 1px solid #cccac8; }
                .sks-select .options-panel ul {
                padding: 0; 
                margin: 0; }
                .sks-select .options-panel ul li {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: relative;
                    text-indent: 5px;
                    border: 1px solid #cccac8;
                    font-weight: 400;
                    margin-top: -1px; }
                    .sks-select .options-panel ul li:first-child {
                    margin-top: 0;
                    border-top: 1px solid transparent; }
                    .sks-select .options-panel ul li:last-child {
                    border-radius: 0px 0px 5px 5px; }
                    .sks-select .options-panel ul li:hover {
                    background-color: #e9f7fe;
                    color: #2c9cd4;
                    border-color: #0096ff;
                    z-index: 22; }
            .sks-select .cur-option {
                height:32px;
                position: relative;
                display: block;
                border: 1px solid #cccac8;
                background-color: #fff;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                border-radius: 3px;
                -moz-background-clip: padding;
                -webkit-background-clip: padding-box;
                background-clip: padding-box;
                text-indent: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 22px; }
                .sks-select .cur-option.disabled {
                border-color: rgba(0, 0, 0, 0.05);
                background: rgba(0, 0, 0, 0.05); }
                .sks-select .cur-option:after {
                position: absolute;
                top: 12px;
                right: 8px;
                content: '';
                width: 14px;
                height: 10px;
                background: -72px -122px no-repeat url("data:image/png;base64,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");
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                -ms-transition: all 0.3s;
                -o-transition: all 0.3s;
                transition: all 0.3s; }

    `]
})
export class SelectComponent {

    @Input() isTranslate: boolean;
    private _model: any[];
    @Input() set model(value: any[]) {
        this._model = value;
        this.init();
    };
    get model(){
        return this._model;
    }
    @Input() curOption: any;
    @Output() curOptionChange: EventEmitter<any> = new EventEmitter<any>();


    ngOnInit() {
        this.init();
    }

    // private $language: ILanguage;
    private options: any[];
    private selected: any;

    // private _model: any[];

    init() {
        let value = this.model;
        if (this.haveAll && value && value[0] && value[0].id !== 'all' && value[0].id !== null) {
            let varName = this.field ? this.field : 'name';
            let first: any = { __defall: true, id: null };
            // first[varName] = this.$language.instant('ALL');
            first[varName] = 'ALL';
            value.unshift(first);
        }
        this.options = this.translate(value);
        setTimeout(() => {
            let curOption = _.find(this.options, it => this.company(it.value, this._curOption) || it[this.valueField] === this._curOption);
            if (!curOption) {
                curOption = _.first(this.options);
            }
            this.changeCurOption(curOption);
        }, 60)

        this._curOption = this.curOption;
    }

    changeCurOption(option: any) {
        // this.currOption = option;
        this.selected = option;
        if (!_.isUndefined(option)) {
            this._curOption = option.__select_item ? option.value : option;
        } else {
            this._curOption = option;
        }
        this.curOptionChange.emit(this._curOption);
    }


    private __curOption: any;
    set _curOption(curr: any) {
        let option = _.find(this.options, it => this.company(it.value, curr) || it[this.valueField] === curr);
        this.selected = option;
        this.__curOption = curr;
    };
    get _curOption() {
        return this.__curOption;
    }

    @Input() cHeight: number;
    @Input() valueField: any;
    @Input() displayField: any;
    @Input() titleField: string;
    @Input() field: any; // property of obj
    @Input() isDisabled?: Boolean;
    @Input() haveAll: Boolean;
    @Input() singleArray: any[];
    @Input() noTranslate: any;
    @Input() change: any;
    @Input() onChange: Function;
    @Input() compare: any;
    @Input() readonly?: Boolean;
    private processData: any;
    private optionsShow: Boolean;
    constructor() {
        if (!this.cHeight) {
            this.cHeight = 32;
        }
        this.processData = this.processDisplay;
    }
    processTitle(item: any, isItem: Boolean) {
        return this.getVal(item, this.titleField || this.displayField || this.field || 'name', isItem, !this.noTranslate);
    }
    hidePanel = () => {
        this.optionsShow = false;
    }
    toggleOptionsPanel() {
        if (this.isDisabled || this.readonly) {
            return;
        }
        this.optionsShow = this.optionsShow ? false : true;
    };

    processDisplay(item: any, isItem: Boolean) {
        return this.getVal(item, this.displayField || this.field || 'name', isItem, !this.noTranslate);
    }
    manualChange(option: any) {
        let data = (option && option.__select_item) ? option.value : option;
        if (this.change && _.isFunction(this.change.before)) {
            this.change.before(data);
        }
        this.changeCurOption(option);
        if (this.onChange) {
            setTimeout(() => {
                if (this.change && _.isFunction(this.change.after)) {
                    this.change.after(data);
                }
                this.onChange();
            });
        }
    }
    translate(data: any) {
        let self = this;
        return _.map(data, it => {
            return {
                __select_item: true,
                value: self.getVal(it, self.valueField, true),
                title: self.processTitle(it, true),
                name: self.processDisplay(it, true)
            }
        });
    }
    getVal(item: any, filed: string, isItem: Boolean, translate?: any) {
        // let $language = this.$language;
        if (this.singleArray) {
            return item ? item : null;
        }
        if (!_.isUndefined(item)) {
            let data = item;
            if (!isItem && this.valueField) {
                data = _.find(this.options, it => this.company(it, item) || it[this.valueField] === item);
                if (_.isUndefined(data)) {
                    data = _.first(this.options);
                }
            }
            if (data) {
                if (_.isString(data)) {
                    return data;
                }
                if (filed) {
                    if (filed && _.isString(filed)) {
                        return !translate ? data[filed] : data[filed];
                        // return !translate ? data[filed] : $language.instant(data[filed]);
                    } else {
                        return null;
                    }
                } else {
                    return data;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    company(a: any, b: any) {
        if (this.compare && _.isFunction(this.compare.equal)) {
            return this.compare.equal(a, b);
        }
        if (_.isEqual(a, b)) {
            return true;
        }
        return _.isObject(a) && _.isObject(b) && _.isMatch(_.omit(b, '$$hashKey'), _.omit(a, '$$hashKey'));
    }


}
