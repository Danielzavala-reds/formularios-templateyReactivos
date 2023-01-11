import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder){}
ngOnInit(): void {
  /* Para que en el objeto las condiciones no aparezcan como null, traemos el objeto de persona, rompiendo la referencia y añadiendo el valor false directamente */
  this.miFormulario.reset({
    ...this.persona,
    condiciones: false
  });

 

  this.miFormulario.valueChanges.subscribe( ({condiciones, ...restoDeArgumentos}) => {
    
    this.persona = restoDeArgumentos;
})
};

miFormulario: FormGroup = this.formBuilder.group({
  genero: [ 'M', Validators.required ],
  notificaciones: [ true, Validators.required ],
  condiciones: [false, Validators.requiredTrue,], /* Para evaluar booleanos podemos usar requiredTrue mandando solo la referencia, ya que es un metodo */
  
});

persona = {
  genero: 'F',
  notificaciones: true,
};



guardar(){
  const formVaule = {...this.miFormulario.value};
  delete formVaule.notificaciones;
  this.persona = formVaule;

  if(this.miFormulario.invalid){
    this.miFormulario.markAllAsTouched(); /* Marcar todo como si ha sido tocado, se va campo por campo y lo toca, esto es para que al tocar el botón salte los errores, si los inputs han sido tocados y/o estan vacuas */
    return 
};

this.miFormulario.reset();
}
  

}
