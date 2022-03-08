import { Component, OnInit } from '@angular/core';
import { movieTheatersDTO } from '../movie-theaters.model';
import { MovieTheatresService } from '../movie-theatres.service';

@Component({
  selector: 'app-index-movie-theaters',
  templateUrl: './index-movie-theaters.component.html',
  styleUrls: ['./index-movie-theaters.component.css']
})
export class IndexMovieTheatersComponent implements OnInit {
  movieTheatres: any;
  displayColumns = ['name', 'actions'];

  constructor(private movieTheatreService: MovieTheatresService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.movieTheatreService.get().subscribe(movieTheatres => {
      this.movieTheatres = movieTheatres;
    });
  }

  delete(id: number) {
    this.movieTheatreService.delete(id).subscribe(() => this.loadData());
  }

}
