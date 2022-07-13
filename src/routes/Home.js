import React from "react";
import { useState, useEffect } from "react";
import Movie from "./../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=ead9cdda0bca2a88ae64f80ea65843ec&targetDt=20220605&weekGb=0"
      )
    ).json();
    setMovie(json.boxOfficeResult);
    setMovies(json.boxOfficeResult.weeklyBoxOfficeList);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1>
        <span>{movie ? movie.showRange : null}</span> Movie Chart
      </h1>
      <hr />
      {loading ? (
        <p>Movies Loading~</p>
      ) : (
        <>
          <div>
            <ol>
              {movies.map((item) => (
                <Movie
                  key={item.rnum}
                  movieCd={item.movieCd}
                  rankOldAndNew={item.rankOldAndNew}
                  tit={item.movieNm}
                  audiChange={item.audiChange}
                />
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;