import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

@Injectable()
export class DataService {
  peopleSource = "https://swapi.dev/api/people";
  shipsSource = "https://swapi.dev/api/starships";
  filterRelativePath = "/?search=";

  constructor(private http: HttpClient) { }

  private search(source: string, term: string) {
    let url = source;
    if (term.trim().length > 0) {
      url += this.filterRelativePath + term
    }
    return this.http.get<{results: any[]}>(url).pipe(
      pluck('results'),
    );
  } 

  searchForPeople(searchTerm: string): Observable<any[]> {
    return this.search(this.peopleSource, searchTerm);
  }

  searchForShips(searchTerm: string): Observable<any[]> {
    return this.search(this.shipsSource, searchTerm);
  }
}
