import React from 'react'
import './App.css';
import Chat, { chatModel } from './Chat';
const App = () => {

  const [username, setUserName] = React.useState("User");
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<chatModel[]>([]);

  const SetMessages = (message_: chatModel) => {
    setMessages((messages) => [...messages, message_]);
  }

  const isOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      {
        open == true ?
          <Chat 
          isOpen = {isOpen}
          username = {username}
          messages = {messages}
          SetMessages = {SetMessages}
          />
          :
          (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
              }}>
              <div
                style={{
                  width: "200px"
                }}
              >
                <input
                  className='input'
                  type="text"
                  placeholder='Your name ...'
                  onChange={(e: any) => { setUserName(e.target.value) }}
                  value={username || ""}
                />
                <div
                  style={{
                    textAlign: 'center',
                  }}>
                  <button
                    className='button'
                    onClick={(e: any) => { if(username != '') isOpen() }
                    }
                  >Next</button>
                </div>
              </div>
            </div>
          )
      }
    </>
  )
}

export default App