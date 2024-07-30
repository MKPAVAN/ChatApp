import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'
import DisplayMessage from '../DisplayMessage'
import './index.css'

const userList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

class ChatApp extends Component {
  state = {
    messages: [],
    currentMessage: '',
    showMentions: false,
    mentionList: userList,
    mentionPosition: -1,
  }

  onChangeInputElement = event => {
    const {value} = event.target
    const atIndex = value.lastIndexOf('@')

    this.setState({
      currentMessage: value,
      showMentions: atIndex >= 0 && atIndex === value.length - 1,
      mentionPosition: atIndex,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {currentMessage} = this.state

    if (currentMessage.trim() === '') {
      return
    }

    const randomUser = userList[Math.floor(Math.random() * userList.length)]
    const newMessage = {
      id: uuidv4(),
      text: currentMessage,
      user: randomUser,
      timestamp: new Date().toLocaleTimeString(),
      likesCount: 0,
    }
    this.setState(prevState => ({
      messages: [...prevState.messages, newMessage],
      currentMessage: '',
      showMentions: false,
    }))
  }

  onLike = id => {
    this.setState(prevState => ({
      messages: prevState.messages.map(message =>
        message.id === id
          ? {...message, likesCount: message.likesCount + 1}
          : message,
      ),
    }))
  }

  handleMentionClick = user => {
    const {currentMessage, mentionPosition} = this.state
    const newMessage = `${currentMessage.slice(
      0,
      mentionPosition,
    )}@${user} ${currentMessage.slice(mentionPosition + 1)}`
    this.setState({
      currentMessage: newMessage,
      showMentions: false,
    })
  }

  render() {
    const {currentMessage, messages, showMentions, mentionList} = this.state

    return (
      <form className="bg-container" onSubmit={this.onSubmitForm}>
        <Header />
        <ul className="messages-container">
          {messages.map(eachMessage => (
            <DisplayMessage
              key={eachMessage.id}
              messageDetails={eachMessage}
              onLike={this.onLike}
            />
          ))}
        </ul>
        <div className="input-container">
          <input
            className="input-element"
            value={currentMessage}
            type="text"
            onChange={this.onChangeInputElement}
          />
          <button className="send-button" type="submit">
            Send
          </button>
          {showMentions && (
            <ul className="mention-list">
              {mentionList.map(user => (
                <li
                  key={user}
                  className="list-user"
                  onClick={() => this.handleMentionClick(user)}
                >
                  {user}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    )
  }
}

export default ChatApp
