using Microsoft.EntityFrameworkCore;
using MoviesAPI.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<MovieActors>()
                .HasKey(x => new { x.ActorId, x.MovieId });

            modelBuilder.Entity<MoviesGenres>()
                .HasKey(x => new { x.GenreId, x.MovieId });

            modelBuilder.Entity<MovieTheatresMovies>()
                .HasKey(x => new { x.MovieTheatreId, x.MovieId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Actor> Actors { get; set; }

        public DbSet<MovieTheatre> MovieTheatres { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieActors> MovieActors { get; set; }
        public DbSet<MoviesGenres> MoviesGenres { get; set; }
        public DbSet<MovieTheatresMovies> MovieTheatresMovies { get; set; }




    }
}
