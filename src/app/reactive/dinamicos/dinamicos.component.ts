import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})


export class DinamicosComponent {
 
miFormulario: FormGroup = this.formBuilder.group({
  nombre: ['', [Validators.required ,Validators.minLength(3)]],
  favoritos: this.formBuilder.array( [
   
      ['Metal Gear', Validators.required],
      ['Death Stranding',Validators.required]
    
  ], Validators.required )
});

nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

get favoritosArr(){
  return this.miFormulario.get('favoritos') as FormArray
}

constructor(private formBuilder: FormBuilder){}

noEsValido(campo: string){
  return this.miFormulario.controls[campo].errors
  && this.miFormulario.controls[campo].touched;
};

arrValido(campo: string){
  return this.miFormulario.controls[campo].errors
  && this.miFormulario.controls[campo].touched
};

agregarFavorito(){
  if(this.nuevoFavorito.invalid){return;}
  
  this.favoritosArr.push(this.formBuilder.control(this.nuevoFavorito.value, Validators.required));

  this.nuevoFavorito.reset()
};

borrar(index: number){
  this.favoritosArr.removeAt(index)
};

guardar(){
  if(this.miFormulario.invalid){
    this.miFormulario.markAllAsTouched(); /* Marcar todo como si ha sido tocado, se va campo por campo y lo toca, esto es para que al tocar el botón salte los errores, si los inputs han sido tocados y/o estan vacuas */
    return 
};
  
console.log(this.miFormulario.value);
console.log(this.favoritosArr.value);
this.miFormulario.reset();
//Este clear es para que al momento de guardar se reseteen los campos y no solo el string
this.favoritosArr.clear();
};

arrays(){
  const arr = [1, 2, 3, 4, 10,1,2,3,4];
const reducer = (accumulator: number, curr: number) => accumulator + curr;
console.log(arr.reduce(reducer));
}

}
