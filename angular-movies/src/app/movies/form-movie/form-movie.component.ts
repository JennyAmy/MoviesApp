import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorsmovieDto } from 'src/app/actors/actors.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDto, movieDto } from '../movies.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  @Input() model!: movieDto;

  @Output() onSaveChanges = new EventEmitter<movieCreationDto>();

  @Input() nonSelectedGenres: multipleSelectorModel[] = [];

  @Input() selectedGenres: multipleSelectorModel[] = [];

  @Input() nonSelectedMovieTheatres: multipleSelectorModel[] = [];

  @Input() selectedMovieTheatres: multipleSelectorModel[] = [];

  @Input() selectedActors: actorsmovieDto[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genreIds: '',
      movieTheatreIds: '',
      actors: ''
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file: File) {
    this.form.get('poster')?.setValue(file);
  }
  saveChanges() {
    const genreIds = this.selectedGenres.map((value) => value.key);
    this.form.get('genreIds')?.setValue(genreIds);
    const movieTheatreIds = this.selectedMovieTheatres.map(
      (value) => value.key
    );
    this.form.get('movieTheatreIds')?.setValue(movieTheatreIds);

    const actors = this.selectedActors.map(val => {
      return { id: val.id, character: val.character }
    })
    this.form.get('actors')?.setValue(actors);

    this.onSaveChanges.emit(this.form.value);
  }

  changeMarkdown(content: string) {
    this.form.get('summary')?.setValue(content);
  }
}
