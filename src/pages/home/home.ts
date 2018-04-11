import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import {APIkeyTMDB} from '../../app/tmdb';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Result {
  release_date : string;
  //id : number;
  overview : string;
  title : string;
  poster_path : string;
  vote_average : number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detailsPage : any;
  results : Observable<Result[]>;
  url : string;

  constructor(public http : HttpClient) {
    this.results = Observable.of([]);
    this.detailsPage = DetailsPage;
    this.url = "https://api.themoviedb.org/3/search/movie";
  }

  onInput(event : any) : void{
    const query : string = event.target.value;
    this.results = query? this.fetchResults(query) : Observable.of([]);
  }

  fetchResults(query : string) : Observable<Result[]> {
    return this.http.get<Result[]>(this.url,{params : {api_key : APIkeyTMDB, language : "fr", query : query}}).pluck("results");
  }
}
