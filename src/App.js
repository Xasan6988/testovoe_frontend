import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { getData, setSearchString, setProjectPerPage, setData, setPage } from './redux/actions';
import './styles/App.scss';
import Data from './components/Data';
import Select from './components/Select';
import Search from './components/Search';
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import { useState } from 'react';

const App = (props) => {

  useEffect(() => {
    const localData = localStorage.getItem('data');
    if (localData) {
      const data = JSON.parse(localData);
      props.setData(data.data);
      props.setSearchString(data.searchString);
      props.setProjectPerPage(data.projectsPerPage);
      props.setPage(data.page);
    }
  }, [])

  useEffect(() => {
    const data = {
      data: props.data,
      searchString: props.searchString,
      projectsPerPage: props.projectsPerPage,
      page: props.page
    }
    localStorage.setItem('data', JSON.stringify(data));
  }, [props.searchString, props.projectsPerPage, props.page, props.data]);

  useEffect(() => {
    props.setPage(1);
  }, [props.searchString])

  return (
    <div className="App">
      <Search />
      {props.loading && <Loader/>}
      {!props.loading && <Data data={props.data}/>}
      <div className="footer">
        <Navigation/>
        <Select/>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.data,
    searchString: state.searchString,
    loading: state.loading,
    projectsPerPage: state.projectsPerPage,
    page: state.page
  }
};

const mapDispatchToProps = {
  getData, setSearchString, setProjectPerPage, setData, setPage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )
  (App)
