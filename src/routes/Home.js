import React from "react";
import { useState, useEffect } from "react";
import Movie from "./../components/Movie";
import styled from 'styled-components';

const OlFlex = styled.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 20px;
  & li {
    width: 50%;
    position: relative;
  }
`;

function Home() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=ead9cdda0bca2a88ae64f80ea65843ec&targetDt=20220310&weekGb=0"
      )
    ).json();
    setMovie(json.boxOfficeResult);
    console.log(json.boxOfficeResult);
    setMovies(json.boxOfficeResult.weeklyBoxOfficeList);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h2>
        <span>{movie ? movie.showRange : null}</span> {movie ? movie.boxofficeType : null}
      </h2>
      <hr />
      {loading ? (
        <p>* Movies Loading *</p>
      ) : (
        <>
          <div>
            <OlFlex>
              {movies.map((item) => (
                <Movie
                  key={item.rnum}
                  movieCd={item.movieCd}
                  rankOldAndNew={item.rankOldAndNew}
                  tit={item.movieNm}
                  audiChange={item.audiChange}
                />
              ))}
            </OlFlex>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;