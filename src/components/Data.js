import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card';

import './Data.scss';

const Data = (props) => {

  const [data, setData] = useState([]);

  const createCards = (data) => {
    setData(data.map(item => {
      return <li key={item.id}><Card project={item} /></li>
    }));
  };

  useEffect(() => {
    createCards(props.data)
  }, [props.data])

  return (
    <div className="projects">
      <ul className="projects_list">
          {data}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.data,
    searchString: state.searchString
  }
};

export default Data
