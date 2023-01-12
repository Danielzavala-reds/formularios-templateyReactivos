import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }
 
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const username = control.value;
    console.log(username);
    console.log(control);
    
   return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${username}`)
      /* el map nos permite transformar el valor que el observable esta emitiendo y regresar cualquier cosa que nosotros queramos  */
        .pipe(
          // delay(3000),
          map(res => {
            /* La res siempre será un arreglo, si el arreglo ya viene con algo significa que ese correo ya esta tomado pero si regresa un arreglo vacio significa que no se ha tomado*/
            return (res.length === 0) ? null : {userNameTomado: true}
          }),
          
      
        );
          


  }
 



}
