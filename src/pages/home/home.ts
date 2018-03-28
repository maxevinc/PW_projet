import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import {APIkeyTMDB} from '../../app/tmdb';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Result {
  date : string;
  //id : number;
  overview : string;
  title : string;
  image : string;
  vote : number;
}
 
const results : Result[] = [
  {title : 'Batman Begining', overview : 'c cool', date : '2005', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/KbKjdreu1edayTusRXsaAlJFVb.jpg', vote : 7.9},
  {title : 'The Dark Knight', overview : 'c cool, le meilleur', date : '2008', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sr8tdzgBj29H8rItNP9e5h097A2.jpg', vote : 7.9},
  {title : 'The Dark Knight Rises', overview : 'c bien', date : '2012', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1e5V4EBrhuO83JyxQZxOz83xX2Q.jpg', vote : 8.1}
]

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
    this.url = "http://api.themoviedb.org/3/movie/12";
  }

  onInput(event : any) : void{
    const query : string = event.target.value;
    this.results = query? Observable.of(results) : Observable.of([]);
  }

  fetchResults() : Observable<Result[]> {
    return this.http.get<Result[]>(this.url,{params : {api_key : APIkeyTMDB, language : "fr"}});
  }
}
