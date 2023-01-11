import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  //  noPuedeSerCloud = (control: FormControl): ValidationErrors | null => {
  //   console.log(control);
  //   const valor = control.value?.trim().toLowerCase();
  //   if(valor === 'cloud'){
  //     return {noCloud: true}
      
  //   }
  //   return null;
  // };

  

  camposIguales(campo1: string, campo2: string) {
    /* El tipo de dato AbstractControl se utiliza porque estamos utilizando un validador de ese tipo que es donde se esta invocando en el registro */
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;


    

      if(pass1 !== pass2){
        formGroup.get(campo2)?.setErrors({noIguales: true})
        // Retornamos un error de tipo ValidationErrors
        return {noIguales: true}
      } 

      /* Precaución en este codigo, ya que remueve cualquier error, si el campo de confirmar tiene alguna otra validación, la va a eliminar */
      formGroup.get(campo2)?.setErrors(null);

      return null
    }


  };

}


