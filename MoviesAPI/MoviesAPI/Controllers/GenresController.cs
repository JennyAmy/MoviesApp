using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Helpers;
using MoviesAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] //This authorization at the controller level applies to the actions in the controller.

    public class GenresController : ControllerBase
    {
        
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenresController(ILogger<GenresController> logger,
            ApplicationDbContext context, 
            IMapper mapper)
        {
            
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }


        [HttpGet]
        //[HttpGet("list")] //api/genres/list
       // [HttpGet("/allgenres")] //Overwrites the controller name and uses this
        //[ResponseCache(Duration =60)]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[ServiceFilter(typeof(MyActionFilter))]
        public async Task<ActionResult<List<GenreDTO>>> Get()
        {
            logger.LogInformation("Getting all the genres");

            var genres = await context.Genres.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<GenreDTO>>(genres);
        }


        [HttpGet("{id}")]
        //[ServiceFilter(typeof(MyActionFilter))]
        public async Task<ActionResult<GenreDTO>> Get(int Id) //[BindRequired] string param2)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == Id);
            
            if (genre == null)
            {
                return NotFound();
            }
            return mapper.Map<GenreDTO>(genre);
        }

         
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = mapper.Map<Genre>(genreCreationDTO);
            context.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();

        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = mapper.Map<Genre>(genreCreationDTO);
            genre.Id = id;
            context.Entry(genre).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == Id);
            
            if (genre == null)
            {
                return NotFound();
            }
            context.Remove(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
