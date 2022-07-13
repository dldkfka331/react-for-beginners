import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

function Movie({ movieCd, rankOldAndNew, tit, audiChange }) {
  return (
    <li style={{ a: "textDecoration : none" }}>
      <h4>
        {rankOldAndNew === "NEW" ? (
          <strong style={{ fontSize: "12px", color: "deeppink" }}>
            {rankOldAndNew}&nbsp;&nbsp;
          </strong>
        ) : null}
        <Link
          to={`./movie/${movieCd}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {tit}
        </Link>
        &nbsp;&nbsp;
        {audiChange > 0 ? (
          <span style={{ fontSize: "14px", color: "red" }}>
            <Icon icon="ant-design:caret-up-filled" />{audiChange}%
          </span>
        ) : (
          <span style={{ fontSize: "14px", color: "blue" }}>
            <Icon icon="ant-design:caret-down-filled" />{audiChange}%
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
