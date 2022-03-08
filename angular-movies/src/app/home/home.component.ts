import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.moviesInTheaters= [{
      title: "Titanic",
      releaseDate: new Date(),
      price: 2400.99,
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWjQVrct9u2FVdeMuExn6RH6U9oVNfSg5eQ&usqp=CAU'
    },
    {
      title: "3 Idiots",
      releaseDate: new Date("11-06-2014"),
      price: 3400.99,
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXJtd2oj1GE_ISvuYDqg7pkYkrsqeROWKXQ&usqp=CAU'

    },
    {
      title: "The Great Gatsby",
      releaseDate: new Date(),
      price: 2400.99,
      poster: 'https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/the_great_gatsby_key_art.jpg'

    }   
];

    this.moviesFutureReleases = [];//[{
    //     title: "King of Boys2",
    //     releaseDate: new Date("11-09-2021"),
    //     price: 3400.99
    //   },
    //   {
    //     title: "Coming to America",
    //     releaseDate: new Date("09-09-2021"),
    //     price: 4400.99
    //   }];
  }
  moviesInTheaters!: { title: string; releaseDate: Date; price: number; poster: any }[];
  moviesFutureReleases: any;
}
