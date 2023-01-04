import { Component, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: []
})
export class BasicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm /* El vievChild lo utilizamos para hacer referencia a la referencia local del formulario desde el html */

  initForm = {
    producto: 'RTX 4080Ti',
    precio: 0,
    existencias: 10
  }


  nombreValido():boolean{
    return this.miFormulario?.controls['producto']?.invalid && 
           this.miFormulario?.controls['producto']?.touched;
  }

  precioValido():boolean{
    
    return this.miFormulario?.controls['precio']?.touched && 
           this.miFormulario?.controls['precio']?.value < 0; 
  }

  // guardar(miFormulario: NgForm){
  guardar(){
    console.log(this.miFormulario.value)
    console.log('Posteo correcto')
    this.miFormulario.resetForm({
      producto: 'Algo',
      precio: 0,
      existencias: 0
    });
  }
}
