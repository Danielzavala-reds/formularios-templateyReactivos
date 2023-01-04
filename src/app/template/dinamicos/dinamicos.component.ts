import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

interface Persona{
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito{
  id: number;
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

 @ViewChild('nombreFormulario') nombreFormulario!: NgForm

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Daniel',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'Death Stranding'},
    ]
  }

  noValido(){
    return this.nombreFormulario?.controls['nombre']?.invalid && 
    this.nombreFormulario?.controls['nombre']?.touched;
  }

  guardar(){
    console.log('Formulario posteado')
    // console.log(this.nombreFormulario)
    
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1 ,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(index: number){
    this.persona.favoritos.splice(index, 1)
  }

}
