import React, {useState, useEffect} from 'react';
import './Card.scss';

const Card = (props) => {

  const [comment, setComment] = useState('');
  const [local, setLocal] = useState([]);

  const loadComment = async () => {
    const commentsFromLocalStorage = localStorage.getItem(props.project.id);

    if (commentsFromLocalStorage) {
      const parse = await JSON.parse(commentsFromLocalStorage);
      setLocal([...parse]);
    }
  };

  const writeCommentHandler = async (e) => {
    e.preventDefault();
    loadComment();
    setLocal([...local, comment]);
    localStorage.setItem(props.project.id, JSON.stringify([...local, comment]));
    return false;
  };

  useEffect(() => {
    loadComment();
  }, [localStorage.getItem(props.project.id)]);

  return(
    <div className="Card">
      <a href={props.project.html_url}>
      <h1 className="Card_name">{props.project.name}</h1>
      <div className="Card_author">
        <img src={props.project.owner.avatar_url} alt="profile_photo" className="author_avatar" />
        <p className="author_name">{props.project.owner.login}</p>
      </div>
      <div className="Card_statistic">
        <img src={process.env.PUBLIC_URL + 'star.png'} alt="" className="statistic_star" />
        <p className="statistic_rating">{props.project.stargazers_count}</p>
        <img src={process.env.PUBLIC_URL + 'watch.png'} alt="" className="statistic_star" />
        <p className="statistic_watch">{props.project.watchers_count}</p>
      </div>
      <div className='comments_list'>
        {local.map((com, i) => {
          return <p key={i}>{com}</p>
        })}
      </div>
    </a>
    <div className="Card_comment">
        <input
          className="comment_input"
          type="text"
          value={comment}
          placeholder='Комментарий к проекту'
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="comment_button"
          onClick={(e) => writeCommentHandler(e)}
        ></button>
      </div>
    </div>
  )
}

export default Card;
