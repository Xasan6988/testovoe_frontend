import React from 'react';
import {connect} from 'react-redux';
import { setPage, getData } from '../redux/actions';

import './Navigation.scss';

const Navigation = (props) => {

  const clickHandler = (e) => {
    const target = e.currentTarget;
    props.setPage(+target.textContent);
    props.getData(props.searchString, +target.textContent, props.projectsPerPage)
  }

  return(
    <div className="Navigation">
      <button
        className="navigation_btn-prev"
        disabled={props.page === 1 ? true : false}
        onClick={() => props.setPage(props.page - 1)}
      ></button>

      <button
        className={"navigation_btn-page " + (props.page === 1 ? 'active_page' : '')}
        onClick={(e) => clickHandler(e)}
      >{props.page === 1 ? 1 : props.page - 1}</button>
      <button
        className={"navigation_btn-page " + (props.page != 1 ? "active_page" : '')}
        onClick={(e) => clickHandler(e)}
      >{props.page !==1 ? props.page : props.page + 1}</button>
      <button
        className="navigation_btn-page"
        onClick={(e) => clickHandler(e)}
      >{props.page !== 1 ? props.page + 1 : props.page + 2}</button>
      <button
        className="navigation_btn-next"
        disabled={props.page === props.pagesCount ? true : false}
        onClick={() => props.setPage(props.page + 1)}
      ></button>
    </div>
  )
};

const mapStateToProps = state => ({
  page: state.page,
  pagesCount: state.pagesCount,
  searchString: state.searchString
})

const mapDispatchToProps = {
  setPage, getData
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
