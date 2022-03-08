using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>();

            CreateMap<ActorDTO, Actor>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<MovieTheatre, MovieTheatreDto>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<MovieTheatreCreationDto, MovieTheatre>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<MovieCreationDto, Movie>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheatresMovies, options => options.MapFrom(MapMovieTheatresMovies))
                .ForMember(x => x.MovieActors, options => options.MapFrom(MapMoviesActors));

            CreateMap<Movie, MovieDto>()
                .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheatres, options => options.MapFrom(MapMovieTheatresMovies))
                .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));



        }

        private List<ActorsMovieDto> MapMoviesActors(Movie movie, MovieDto movieDto)
        {
            var result = new List<ActorsMovieDto>();

            if (movie.MovieActors != null)
            {
                foreach (var actors in movie.MovieActors)
                {
                    result.Add(new ActorsMovieDto()
                    {
                      Id = actors.ActorId,
                      Name = actors.Actor.Name,
                      Character = actors.Character,
                      Picture = actors.Actor.Picture,
                      Order = actors.Order

                    });
                }
            }
            return result;
        }

        private List<MovieTheatreDto> MapMovieTheatresMovies(Movie movie, MovieDto movieDto)
        {
            var result = new List<MovieTheatreDto>();

            if (movie.MovieTheatresMovies != null)
            {
                foreach (var theatre in movie.MovieTheatresMovies)
                {
                    result.Add(new MovieTheatreDto() 
                    { Id = theatre.MovieTheatreId,
                       Name = theatre.MovieTheatre.Name,
                       Latitude = theatre.MovieTheatre.Location.Y,
                       Longitude = theatre.MovieTheatre.Location.X
                    });
                }
            }
            return result;
        }

        private List<GenreDTO> MapMoviesGenres(Movie movie, MovieDto movieDto)
        {
            var result = new List<GenreDTO>();

            if(movie.MoviesGenres != null)
            {
                foreach(var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }
            return result;
        }

        private List<MoviesGenres> MapMoviesGenres(MovieCreationDto movieCreationDto, Movie movie)
        {
            var result = new List<MoviesGenres>();

            if(movieCreationDto.GenreIds == null) { return result; }

            foreach(var id in movieCreationDto.GenreIds)
            {
                result.Add(new MoviesGenres() { GenreId = id });  
            }

            return result;
        }

        private List<MovieTheatresMovies> MapMovieTheatresMovies(MovieCreationDto movieCreationDto,
            Movie movie)
        {
            var result = new List<MovieTheatresMovies>();

            if (movieCreationDto.MovieTheatreIds == null) { return result; }

            foreach (var id in movieCreationDto.MovieTheatreIds)
            {
                result.Add(new MovieTheatresMovies() { MovieTheatreId = id });
            }

            return result;
        }

        private List<MovieActors> MapMoviesActors(MovieCreationDto movieCreationDto, Movie movie)
        {
            var result = new List<MovieActors>();

            if(movieCreationDto.Actors == null) { return result; }

            foreach(var actor in movieCreationDto.Actors)
            {
                result.Add(new MovieActors() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }
    }
}
