import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

export interface Result {
  title : string;
  author : string;
  date : string;
  image : string;
}

const results : Result[] = [
  {title : 'Batman Begins', author : 'Cristopher Nolan', date : '2005', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/KbKjdreu1edayTusRXsaAlJFVb.jpg'},
  {title : 'The Dark Knight', author : 'Cristopher Nolan', date : '2008', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sr8tdzgBj29H8rItNP9e5h097A2.jpg'},
  {title : 'The Dark Knight Rises', author : 'Cristopher Nolan', date : '2012', image : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1e5V4EBrhuO83JyxQZxOz83xX2Q.jpg'}
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detailsPage : any;
  results : Result[];
  params : Result;

  constructor(public navCtrl: NavController) {
    this.results = [];
    this.detailsPage = DetailsPage;
  }

  onInput(event : any) : void{
    const query : string = event.target.value;
    this.results = query? results : [];
  }
}
