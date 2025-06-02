import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { characterModel } from '../model/characterModel';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  url = environment.apiURL;
  constructor(private httpClient: HttpClient) { }

  getCharacter(name:string): Observable<characterModel[]>{
    const headers = new HttpHeaders().set("ngrok-skip-browser-warning","true");
    return this.httpClient.get<characterModel[]>("/characters?name="+name,{headers});
  }

}
