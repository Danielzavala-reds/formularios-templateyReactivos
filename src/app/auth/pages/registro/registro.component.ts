import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { UserValidatorService } from 'src/app/shared/validator/user-validator.service';

// import { emailPattern, noPuedeSerCloud, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit{


miFormulario: FormGroup = this.formBuilder.group({
  nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)] ],
  email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator ] ],
  username: ['', [Validators.required,], [this.userValidator] ], /* No ejecutamos el método porque tenemos que mandar la referencia a la funcion que queremos ejecutar cada vez que el formulario sufra alguna modificacion que requiera ser evaluada*/
  password: ['', [Validators.required, Validators.minLength(6)] ],
  password2: ['', [Validators.required] ],
}, { /* Este otro objeto son opciones que le podemos mandar al formGroup */
  validators: [ this.validatorService.camposIguales('password', 'password2') ]
});



get userErrorMsg(): string{
  const errors = this.miFormulario.get('username')?.errors

  if(errors?.['required']){
    return 'El username es obligatorio'
  }else if(errors?.['userNameTomado']){
    return 'Username ya en uso '
  }

  return ''
}

get emailErrorMsg(): string{
 const errors = this.miFormulario.get('email')?.errors;
  
 if(errors?.['required']){
  return 'Email es obligatorio'
 } else if(errors?.['pattern']){
  return 'El valor ingresado no tiene formato de correo electrónico'
 } else if (errors?.['emailTomado']){
  return 'Este correo ya ha sido registrado'
 };


 return ''
};

constructor(private formBuilder: FormBuilder,
            private validatorService: ValidatorService,
            private emailValidator: EmailValidatorService,
            private userValidator: UserValidatorService){}

ngOnInit(): void {
  this.miFormulario.reset({
    nombre: '',
    email: 'test1@test.com',
    username: 'test1',
    password: '',
    password2: '',
  })
}

campoNoValido(campo: string){
  return this.miFormulario.get(campo)?.invalid
         && this.miFormulario.get(campo)?.touched
};

// emailRequired(){
//   return this.miFormulario.get('email')?.errors?.['required']
//   && this.miFormulario.get('email')?.touched
// };

// emailFormato(){
//   return this.miFormulario.get('email')?.errors?.['pattern']
//   && this.miFormulario.get('email')?.touched
// }

// emailTomado(){
//   return this.miFormulario.get('email')?.errors?.['emailTomado']
//   && this.miFormulario.get('email')?.touched
// }


submitFormulario(){
  console.log(this.miFormulario.value);

  this.miFormulario.markAllAsTouched();
}


}
