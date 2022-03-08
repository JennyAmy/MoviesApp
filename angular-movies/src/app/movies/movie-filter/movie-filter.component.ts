import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;

  genres =[{id: 1, name: 'Prose'},{id: 2, name: 'Poetry'}]

  movies =[
    {title: "Titanic", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWjQVrct9u2FVdeMuExn6RH6U9oVNfSg5eQ&usqp=CAU"},
    {title: "The Great Gatsby", poster: "https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/the_great_gatsby_key_art.jpg"},
    {title: "3 Idiots", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXJtd2oj1GE_ISvuYDqg7pkYkrsqeROWKXQ&usqp=CAU"}
  ];

  originalMovies = this.movies;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false
    });

    this.form.valueChanges.subscribe(values =>{
      this.movies = this.originalMovies;
      this.filterMovies(values);
    })
  }

  filterMovies(values: any){
    if(values.title){
      this.movies = this.movies.filter(movie => movie.title.indexOf(values.title) !== -1);
    }
  }

  clearform(){
    this.form.reset();
  }
}
