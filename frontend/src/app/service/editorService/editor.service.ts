import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolicySet } from 'src/app/model/PolicySet';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private http : HttpClient) { }

  url ="http://localhost:8080/test";

  test(): Observable<any>{
      return this.http.get('http://localhost:8080/test/test');
  }
  
}
