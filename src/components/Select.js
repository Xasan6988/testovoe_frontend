import React from 'react';
import {connect} from 'react-redux';
import { setProjectPerPage, getData } from '../redux/actions';

import './Select.scss';

const Select = (props) => {

  const changeHandler = (e) => {
    const target = e.currentTarget;
    props.setProjectPerPage(+target.value);
    props.getData(props.searchString, props.page, +target.value)
  }

  return(
    <div className="Select">
      <select defaultValue={props.projectsPerPage} onChange={(e) => changeHandler(e)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  )
}

const mapStateToProps = state => ({
  projectsPerPage: state.projectsPerPage,
  searchString: state.searchString,
  page: state.page
});

const mapDispatchToProps = {
  setProjectPerPage, getData
}

export default connect(mapStateToProps, mapDispatchToProps)(Select);
