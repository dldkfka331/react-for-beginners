import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Movie({ movieCd, rankOldAndNew, tit, audiChange }) {
  return (
    <li>
      <h4>
        {rankOldAndNew === "NEW" ? (
          <strong style={{ fontSize: "12px", color: "cadetblue" }}>
            {rankOldAndNew}&nbsp;&nbsp;
          </strong>
        ) : null}
        <Link to={`./movie/${movieCd}`}>{tit}</Link>
       
        &nbsp;&nbsp;
        {audiChange > 0 ? (
          <span style={{ fontSize: "14px", color: "yellow" }}>({audiChange})</span>
        ) : (
          <span style={{ fontSize: "14px", color: "blue" }}>
            ({audiChange})
          </span>
        )}
      </h4>
    </li>
  );
}

Movie.propTypes = {
  rankOldAndNew: PropTypes.string,
  tit: PropTypes.string,
  audiChange: PropTypes.string
}

export default Movie;
