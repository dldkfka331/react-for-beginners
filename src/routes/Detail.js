import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

function Detail(){
  const movieCd =useParams();
  const [loading, setLoading] = useState(true);
  const [detailMovie, setDetailMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [audits, setAudits] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=ead9cdda0bca2a88ae64f80ea65843ec&movieCd=${movieCd.id}`)
    ).json();
    setDetailMovie(json.movieInfoResult.movieInfo);
    setActors(json.movieInfoResult.movieInfo.actors);
    setAudits(json.movieInfoResult.movieInfo.audits);
    setLoading(false);
  };
  console.log(detailMovie);
  console.log(actors);
  console.log(audits);

  useEffect(()=>{
    getMovies();  
  },[]);
  
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div style={{ "& span": { fontSize: "12px", color: "darkgreen" } }}>
          <h3>{detailMovie.movieNm}</h3>
          <p>
            영어제목 : <span>{detailMovie.movieNmEn}</span>
          </p>
          <p>
            관람등급 : &nbsp;
            {audits.map((item) => (
              <>{item.watchGradeNm}</>
            ))}
          </p>
          {detailMovie.showTm ? (
            <p>
              상영시간 : <span>{detailMovie.showTm}분</span>
            </p>
          ) : null}
          {detailMovie.openDt ? (
            <p>
              개봉일 : &nbsp;
              <span>
                {detailMovie.openDt.slice(0, 4)}년
                {detailMovie.openDt.slice(4, 6)}월
                {detailMovie.openDt.slice(6, 8)}일
              </span>
            </p>
          ) : null}
          <p>
            출연진 ({actors.length}명) : &nbsp;
            {actors.map((item, index) => {
              if (index == actors.length - 1) {
                return (
                  <span>
                    {item.peopleNm} {item.cast ? <>({item.cast}역)</> : null}
                    &nbsp;
                  </span>
                );
              } else {
                return (
                  <span>
                    {item.peopleNm} {item.cast ? <>({item.cast}역)</> : null}
                    &nbsp;/&nbsp;
                  </span>
                );
              }
            })}
          </p>
        </div>
      )}
    </>
  );
}
export default Detail;

