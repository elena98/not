import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaNoticias } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  apiKey= environment.apiKey;
  apiUrl=environment.apiUrl;
  headers = new HttpHeaders({
    'X-Api-key':this.apiKey
  });

  constructor(private http:HttpClient) { }

  private callAPI<T>(query:string){
    query=this.apiUrl+query;

    return this.http.get<T>(query,{headers: this.headers});
  }
  getNoticias() {
    return this.callAPI<RespuestaNoticias>(`/top-headlines?country=us`);
    }
  getNoticiasByCategory(category:string){
    return this.callAPI<RespuestaNoticias>(`/top-headlines?country=us&category=${category}`);
  }
}
