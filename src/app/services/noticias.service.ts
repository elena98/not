import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaNoticias } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http:HttpClient) { }
  getNoticias() {
    return this.http.get<RespuestaNoticias>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=3b434184f5114416973ffb57fe1224c7`);
    }
}
