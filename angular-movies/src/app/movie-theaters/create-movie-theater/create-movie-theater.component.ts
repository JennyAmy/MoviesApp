import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { movieTheatersCreationDTO } from '../movie-theaters.model';
import { MovieTheatresService } from '../movie-theatres.service';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styleUrls: ['./create-movie-theater.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor(private movieTheatreService: MovieTheatresService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(movieTheater: movieTheatersCreationDTO) {
    this.movieTheatreService.create(movieTheater).subscribe(() => this.router.navigate(['/movietheaters']));
  }
}
