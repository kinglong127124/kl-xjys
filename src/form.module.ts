import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './checkbox.component';
import { RadioComponent } from './radio.component';
import { SwitchComponent } from './switch.component';
import { SelectComponent } from './select.component';
import { PutErrorComponent } from './puterror.component';
import { TranslateModule } from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [RadioComponent, CheckboxComponent, SwitchComponent, SelectComponent, PutErrorComponent],
    exports: [RadioComponent, CheckboxComponent, SwitchComponent, SelectComponent, PutErrorComponent]
})


export class FormModule { }
