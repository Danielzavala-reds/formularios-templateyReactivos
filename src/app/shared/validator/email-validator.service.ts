import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, delay} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  // Si en el retorno, resuelve un null SIGNIFICA QUE NO HAY NINGUN ERROR, PERO SI REGRESA UN OBJETO SIGNIFICA QUE HAY UN ERROR

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(email);
    console.log(control);
    
   return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
      /* el map nos permite transformar el valor que el observable esta emitiendo y regresar cualquier cosa que nosotros queramos  */
        .pipe(
          delay(3000),
          map(res => {
            /* La res siempre será un arreglo, si el arreglo ya viene con algo significa que ese correo ya esta tomado pero si regresa un arreglo vacio significa que no se ha tomado*/
            return (res.length === 0) ? null : {emailTomado: true}
          }),
          
      
        );
          


  }
 
}
