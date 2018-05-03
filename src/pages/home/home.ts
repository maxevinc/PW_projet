import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { APIkeyTMDB } from '../../app/tmdb';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';

export interface Result {
  release_date: string;
  //id : number;
  overview: string;
  title: string;
  poster_path: string;
  vote_average: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  detailsPage: any;
  results: Observable<Result[]>;
  url: string;
  urlDisco: string;
  shakeSubscription : Subscription

  constructor(public http: HttpClient, public alertCtrl: AlertController, public navCtrl: NavController, private platform : Platform, private shake : Shake) {
    this.results = Observable.of([]);
    this.detailsPage = DetailsPage;
    this.url = "https://api.themoviedb.org/3/search/movie";
    this.urlDisco = "https://api.themoviedb.org/3/discover/movie";
  }

  onInput(event: any): void {
    const query: string = event.target.value;
    this.results = query ? this.fetchResults(query) : Observable.of([]);
  }

  fetchResults(query: string): Observable<Result[]> {
    return this.http.get<Result[]>(this.url, { params: { api_key: APIkeyTMDB, language: "fr", query: query } }).pluck("results");
  }

  private discoverMovies(): Observable<Result[]> {
    return this.http.get<Result[]>(this.urlDisco, { params: { api_key: APIkeyTMDB, language: "fr", primary_release_year: '2018' } }).pluck("results");
  }

  private showRandomMovieAlert(movies: Result[]): void {
    var movie: Result = movies[Math.floor(Math.random() * movies.length)];
    let confirm = this.alertCtrl.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(DetailsPage, {movie});
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidEnter() : void {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready()).switchMap(() => this.shake.startWatch()).switchMap(() => this.discoverMovies()).subscribe(results => this.showRandomMovieAlert(results));
  }

  ionViewWillLeave() : void {
    this.shakeSubscription.unsubscribe();
  }
}
