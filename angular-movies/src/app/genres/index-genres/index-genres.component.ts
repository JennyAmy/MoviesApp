import { genreDTO } from './../genres.model';
import { GenresService } from './../genres.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres!: genreDTO[];
  columnsToDisplay=['name', 'actions'];
  
  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.genresService.getAll().subscribe(genres =>{
      this.genres = genres;
    });
  }

  loadGenres(){
    this.genresService.getAll().subscribe(genres =>{
      this.genres = genres;
    });
  }

  delete(id: number){
    this.genresService.delete(id)
    .subscribe(() =>{
      this.loadGenres();
    })
  }

}
