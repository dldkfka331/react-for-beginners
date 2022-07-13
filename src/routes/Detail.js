import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

function Detail(){
  const movieCd =useParams();
  const [detailMovie, setDetailMovie] = useState([]);
  const [actors, setActors] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=ead9cdda0bca2a88ae64f80ea65843ec&movieCd=${movieCd.id}`)
    ).json();
    setDetailMovie(json.movieInfoResult.movieInfo);
    setActors(json.movieInfoResult.movieInfo.actors);
  };
  console.log(detailMovie);
  console.log(actors);

  useEffect(()=>{
    getMovies();  
  },[]);
  
  return (
    <div style={{ "& span": { fontSize: "12px", color: "darkgreen" } }}>
      <h3>{detailMovie.movieNm}</h3>
      <p>
        영화 영어제목 : <span>{detailMovie.movieNmEn}</span>
      </p>
      {detailMovie.showTm ? (
        <p>
          영화 상영시간 : <span>{detailMovie.showTm}분</span>
        </p>
      ) : null}
      {detailMovie.openDt ? (
        <p>
          영화 개봉일 :
          <span>
            {detailMovie.openDt.slice(0, 4)}년 {detailMovie.openDt.slice(4, 6)}
            월 {detailMovie.openDt.slice(6, 8)}일
          </span>
        </p>
      ) : null}
      <p>
        영화 출연진 ({actors.length}명) : &nbsp;
        {actors.map((item) => (
          <span>{item.peopleNm}&nbsp;/&nbsp;</span>
        ))}
      </p>
    </div>
  );
}
export default Detail;

