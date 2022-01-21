import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  people$!: Observable<any[]>;
  private peopleSearchTerms = new Subject<string>();

  ships$!: Observable<any[]>;
  private shipsSearchTerms = new Subject<string>();

  constructor(private dataService: DataService) { }

  searchPeople(term: string) {
    this.peopleSearchTerms.next(term);
  }

  searchShips(term: string) {
    this.shipsSearchTerms.next(term);
  }

  ngOnInit() {
    this.people$ = this.setupSearch(this.peopleSearchTerms, this.dataService.searchForPeople);
    this.ships$ = this.setupSearch(this.shipsSearchTerms, this.dataService.searchForShips);
  }

  setupSearch(subject: Subject<string>, search: (term: string) => Observable<any[]>): Observable<any[]> {
    return subject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      startWith(''),
      switchMap((term: string) => search.call(this.dataService, term).pipe(
        catchError(error => {
          console.error(error);
          return [];
        })
      ))
    )
  }
  
}
