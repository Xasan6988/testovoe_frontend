import React, {useState} from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';
import { setSearchString, getData } from '../redux/actions';
import './Search.scss';


const Search = (props) => {

  const [search, setSearch] = useState(props.searchString);

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      props.setSearchString(search)
      searchHandler()
    }
  }

  const searchHandler = () => {
    props.getData(search, props.page, props.projectsPerPage)
  }

  useEffect(() => {
    setSearch(props.searchString)
  }, [props.searchString]);

  return(
    <div className='Search'>
      <input
        className="search_input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={keyDownHandler}
        placeholder={"Начните вводить текст для поиска (не менее трех символов)"}
      />
      <button className="search_button" onClick={() => {
        props.setSearchString(search)
        searchHandler()
      }}></button>
    </div>
  )
}

const mapStateToProps = state => ({
  searchString: state.searchString,
  projectsPerPage: state.projectsPerPage,
  page: state.page
})

const mapDispatchToProps = {
  setSearchString, getData
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
