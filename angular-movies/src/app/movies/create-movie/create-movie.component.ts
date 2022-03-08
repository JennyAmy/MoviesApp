import { movieTheatersCreationDTO } from './../../movie-theaters/movie-theaters.model';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDto } from '../movies.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService,
    private router: Router) { }

  nonSelectedGenres!: multipleSelectorModel[];
  nonSelectedMovieTheatres!: multipleSelectorModel[];

  ngOnInit(): void {
    this.moviesService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        return <multipleSelectorModel>{ key: genre.id, value: genre.name }
      });

      this.nonSelectedMovieTheatres = response.movieTheatres.map(movieTheatre => {
        return <multipleSelectorModel>{ key: movieTheatre.id, value: movieTheatre.name }
      });
    })
  }

  saveChanges(movieCreationDto: movieCreationDto) {
    console.log(movieCreationDto);
    this.moviesService.create(movieCreationDto).subscribe(() => {
      this.router.navigate(['/']);
    })

  }


}
