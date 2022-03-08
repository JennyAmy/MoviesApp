using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.DTOs
{
    public class MoviePostGetDto
    {
        public List<GenreDTO> Genres { get; set; }
        public List<MovieTheatreDto> MovieTheatres { get; set; }

    }
}
