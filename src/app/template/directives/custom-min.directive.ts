import { Directive, Input } from "@angular/core";
import { FormControl ,Validator, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector: '[customMin] [ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator {
    @Input() minimo!: number;

    constructor(){ }

    validate(control: FormControl){
        const inputValue = control.value
        // console.log(inputValue);
        // console.log('minimo', this.minimo);

        return (inputValue < this.minimo) ? {'customMin': true} : null;
    }
}