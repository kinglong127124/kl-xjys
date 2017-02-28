"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var checkbox_component_1 = require('./checkbox.component');
var radio_component_1 = require('./radio.component');
var switch_component_1 = require('./switch.component');
var select_component_1 = require('./select.component');
var puterror_component_1 = require('./puterror.component');
var ng2_translate_1 = require('ng2-translate');
var FormModule = function () {
    function FormModule() {}
    FormModule = __decorate([core_1.NgModule({
        imports: [common_1.CommonModule, ng2_translate_1.TranslateModule],
        declarations: [radio_component_1.RadioComponent, checkbox_component_1.CheckboxComponent, switch_component_1.SwitchComponent, select_component_1.SelectComponent, puterror_component_1.PutErrorComponent],
        exports: [radio_component_1.RadioComponent, checkbox_component_1.CheckboxComponent, switch_component_1.SwitchComponent, select_component_1.SelectComponent, puterror_component_1.PutErrorComponent]
    }), __metadata('design:paramtypes', [])], FormModule);
    return FormModule;
}();
exports.FormModule = FormModule;
//# sourceMappingURL=sourcemaps/form.module.js.map
