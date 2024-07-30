import './index.css'

const DisplayMessage = props => {
  const {messageDetails, onLike} = props
  const {id, text, user, timestamp, likesCount} = messageDetails
  const initial = user[0]

  const handleLikeClick = event => {
    event.stopPropagation()
    onLike(id)
  }

  return (
    <li>
      <div className="user-cont">
        <p className="initial-circle">{initial}</p>
        <p className="user">{user}</p>
        <p>{timestamp}</p>
      </div>
      <div className="message-cont">
        <p className="text">{text}</p>
        <button type="button" className="likes-count" onClick={handleLikeClick}>
          Likes <span>{likesCount}</span>
        </button>
      </div>
    </li>
  )
}

export default DisplayMessage
