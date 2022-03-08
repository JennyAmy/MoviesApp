using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Entities
{
    public class MovieTheatresMovies
    {
        public int MovieTheatreId { get; set; }
        public int MovieId { get; set; }
        public MovieTheatre MovieTheatre { get; set; }
        public Movie Movie { get; set; }
    }
}
