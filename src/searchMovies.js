import React,{useState} from "react";
import MovieCard from './movieCard.js';
export default function searchMovies() {

  const [query,setQuery] = useState('');
  const [movie,setMovie] = useState([]);

  const searchMovies = async e => {
    e.preventDefault();
    console.log("submit");

    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b716aae6100cd80306d8af42ea89c288&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovie(data.results);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
    <form className="form" onSubmit={searchMovies}>
      <label className="label" htmlFor="query">
        Movie Name
      </label>
      <input
        className="input"
        type="text"
        name="query"
        placeholder="i.e. Jurassic Park"
        value={query} onChange={(e) => setQuery(e.target.value)}/>
      <button className="button" type="submit">
        Search
      </button>
    </form>
    <div className="card-list">
      {movie.filter(m => m.poster_path).map(m=> 
        ( <MovieCard m={m}key={m.id}/>))}
    </div>
    </>
  );
}
