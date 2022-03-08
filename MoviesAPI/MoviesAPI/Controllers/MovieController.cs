using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private string container = "movies";

        public MovieController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }

        [HttpGet("id")]
        public async Task<ActionResult<MovieDto>> Get(int id)
        {
            var movie = await context.Movies
                .Include(x => x.MoviesGenres).ThenInclude(x => x.Genre)
                .Include(x => x.MovieTheatresMovies).ThenInclude(x => x.MovieTheatre)
                .Include(x => x.MovieActors).ThenInclude(x => x.Actor)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(movie == null)
            {
                return NotFound();
            }

            var dto = mapper.Map<MovieDto>(movie);
            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();
            return dto;
        }


        [HttpGet("postget")]
        public async Task<ActionResult<MoviePostGetDto>> PostGet()
        {
            var movieTheatres = await context.MovieTheatres.OrderBy(x => x.Name).ToListAsync();
            var genres = await context.Genres.OrderBy(x => x.Name).ToListAsync();

            var movieTheatreDto = mapper.Map<List<MovieTheatreDto>>(movieTheatres);
            var genreDto = mapper.Map<List<GenreDTO>>(genres);

            return new MoviePostGetDto() { Genres = genreDto, MovieTheatres = movieTheatreDto };
        }
         

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] MovieCreationDto movieCreationDto)
        {
            var movie = mapper.Map<Movie>(movieCreationDto);

            if(movieCreationDto.Poster != null)
            {
                movie.Poster = await fileStorageService.SaveFile(container, movieCreationDto.Poster); 
            }
            AnnotateActorsOrder(movie);
            context.Add(movie); 
            await context.SaveChangesAsync();
            return StatusCode(201);
        }

        private void AnnotateActorsOrder(Movie movie)
        {
            if(movie.MovieActors != null)
            {
                for(int i = 0; i < movie.MovieActors.Count; i++)
                {
                    movie.MovieActors[i].Order = i;
                }
            }
        }
    }
}
