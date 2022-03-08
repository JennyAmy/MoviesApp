using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieTheatresController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieTheatresController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<MovieTheatreDto>>> Get()
        {
            var entities = await context.MovieTheatres.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<MovieTheatreDto>>(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieTheatreDto>> Get(int id)
        {
            var movieTheatre = await context.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);

            if(movieTheatre == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieTheatreDto>(movieTheatre);
        }

        [HttpPost]
        public async Task<ActionResult> Post(MovieTheatreCreationDto movieTheatreCreationDto)
        {
            var movieTheatre = mapper.Map<MovieTheatre>(movieTheatreCreationDto);
            context.Add(movieTheatre);
            await context.SaveChangesAsync();
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, MovieTheatreCreationDto movieTheatreCreationDto)
        {
            var movieTheatre = await context.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);

            if(movieTheatre == null)
            {
                return NotFound();
            }

            movieTheatre = mapper.Map(movieTheatreCreationDto, movieTheatre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movieTheater = await context.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);

            if(movieTheater == null)
            {
                return NotFound();
            }

            context.Remove(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
