using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.DTOs
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool InTheaters { get; set; }
        public DateTime Releasedate { get; set; }
        public string Poster { get; set; }
        public List<GenreDTO> Genres { get; set; }
        public List<MovieTheatreDto> MovieTheatres { get; set; }
        public List<ActorsMovieDto> Actors { get; set; }



    }
}
