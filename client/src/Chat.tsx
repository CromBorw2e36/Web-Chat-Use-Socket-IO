import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001')

export interface chatModel {
  username: string | undefined,
  message: string | undefined,
  time: Date | undefined
}

function Chat(props: any) {
  const [message, setMessage] = React.useState<string>("");
  // const [messages, setMessages] = React.useState<chatModel[]>([]);
  const { 
    username, 
    isOpen,
    messages,
    SetMessages
  } = props;

  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      // setMessages((messages) => [...messages, data]);
      SetMessages(data);
      console.log("Received message: " + messages)
    });
  }, [socket])

  const handleChangeInput = (e: any) => {
    setMessage(e.target.value);
  }

  const handleClick = () => {
    const user = {
      username: username,
      message: message,
      time: new Date()
    }
    socket.emit("send_message", user);
    // setMessages((messages) => [...messages, user])
    SetMessages(user);
    console.log('messages ', messages)
  }



  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <p
          style={{
            textAlign: 'right'
          }}
          onClick={(e: any) => isOpen()}>X</p>

        <div
          style={{
            border: '1px solid',
            height: '300px',
            width: '300px',
            overflowY: "scroll",
            marginBottom: '10px',
            fontSize: '13px'
          }}
        >
          {
            messages &&
            messages.map((item: chatModel, i: number) => (
              username == item.username ?
                (
                  <p
                    key={i}
                    style={{
                      textAlign: 'right'
                    }}
                  >{item.message}</p>
                ) : (
                  <div
                    key={i}
                    style={{
                      textAlign: 'left'
                    }}
                  >
                    <p
                      className="name"
                    >{item.username}:</p>
                    <p
                      className="message"
                    >{item.message}</p>
                  </div>
                )
            ))
          }
        </div>
        <div>
          <input
            type="text"
            onChange={handleChangeInput}
            style={{
              width: '100%',
              height: '20px',
              borderRadius: '5px',
            }}
            placeholder="Enter chat ..."
          />
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <button
              onClick={handleClick}
              className="button"
            >Sent</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Chat;
