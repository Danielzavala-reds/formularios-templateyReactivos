import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

// miFormulario: FormGroup = new FormGroup({
//   nombre: new FormControl('RTX 4080Ti'),  /* La llave puede ir con comillas o no, es opcional */
//   precio: new FormControl(1500),  /* La llave puede ir con comillas o no, es opcional */
//   existencias: new FormControl(5),  /* La llave puede ir con comillas o no, es opcional */

// })
  
 /* Los valores los ponemos como un  arreglo porque vienen validaciones y validaciones asincronas */
miFormulario: FormGroup = this.formBuilder.group({
  nombre: [ , [Validators.required, Validators.minLength(3)] ,], /* Para requerir más validadores síncronos (colección) usamos [] en dichos validadores ya que la segunda coma es para validadores asíncronos */                 
  precio: [ , [Validators.required ,Validators.min(0)] ],                   
  existencias: [ , [Validators.required ,Validators.min(0)] ],                  
});
// Utilizaremos el FormBuilder el cual es un servicio
constructor(private formBuilder: FormBuilder){}

ngOnInit(): void {
  this.miFormulario.reset({  /* Al usar setValue, si no falta alguna propiedad que es necesaria para el formulario, la aplicacion revienta, es recomendable usar el .reset */
    nombre: 'RTX4080Ti',
    precio: 1600,
    
  })
}


// Para no crear multiples métodos para evaluar cada input, mandamos como argumento el campo a evaluar
campoEsValido(campo: string){
  return this.miFormulario.controls[campo].errors
         && this.miFormulario.controls[campo].touched;
};

guardar(){

  if(this.miFormulario.invalid){
    this.miFormulario.markAllAsTouched(); /* Marcar todo como si ha sido tocado, se va campo por campo y lo toca, esto es para que al tocar el botón salte los errores, si los inputs han sido tocados y/o estan vacuas */
    return 
  };


  console.log(this.miFormulario.value)
  this.miFormulario.reset();
}

}
