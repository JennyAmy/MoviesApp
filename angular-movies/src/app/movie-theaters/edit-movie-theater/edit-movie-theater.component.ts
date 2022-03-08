import { movieTheatersCreationDTO, movieTheatersDTO } from './../movie-theaters.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTheatresService } from '../movie-theatres.service';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private movieTheatreService: MovieTheatresService,
    private router: Router) { }

  model!: movieTheatersDTO;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.movieTheatreService.getByid(params.id).subscribe(movieTheatre =>
        this.model = movieTheatre);
    })
  }

  saveChanges(movieTheater: movieTheatersCreationDTO) {
    this.movieTheatreService.edit(this.model.id, movieTheater).subscribe(() =>
      this.router.navigate(['/movietheaters']));
  }

}
