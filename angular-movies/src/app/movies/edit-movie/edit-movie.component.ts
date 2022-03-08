import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieCreationDto, movieDto } from '../movies.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: movieDto = {
    title: "Spider-Man", inTheatres: true, summary: "Spidemrnn dbben",
    releaseDate: new Date(), trailer: "aggsdhhd", poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWjQVrct9u2FVdeMuExn6RH6U9oVNfSg5eQ&usqp=CAU'
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

    })
  }

  saveChanges(movieCreationDto: movieCreationDto) {

  }

}
