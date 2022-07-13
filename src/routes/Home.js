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
  const [date, setDate] = useState('20210301');
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=ead9cdda0bca2a88ae64f80ea65843ec&targetDt=${date}&weekGb=0`
      )
    ).json();
    setMovie(json.boxOfficeResult);
    setMovies(json.boxOfficeResult.weeklyBoxOfficeList);
    setLoading(false);

  };

  useEffect(() => {
    getMovies();
  }, [date]);

  const onDate = (event) => {
    setLoading(true);
    setDate(event.target.value);
    console.log(event.target[event.eventPhase].innerText)
  }

  return (
    <div>
      <select value={date} onChange={onDate} style={{ padding: "10px 20px" }}>
        <option value="20210301">2021년 03월</option>
        <option value="20210605">2021년 06월</option>
        <option value="20220105">2022년 01월</option>
        <option value="20220705">2022년 07월</option>
      </select>
      <h2>
        {movie ? (
          <>
            {date.innerText} 첫째주 {movie.boxofficeType}
          </>
        ) : null}
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