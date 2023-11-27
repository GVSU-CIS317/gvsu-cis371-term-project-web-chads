import React, {useEffect, useState} from "react";
import styled from "styled-components";

export default function ChatTyping({socket}) {
   const  [typing, setTyping] = useState(false);
    const  [typingUser, setTypingUser] = useState("");
    useEffect(() => {
        if (socket.current) {
            socket.current.on("typing", async (data) => {
                const user = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_KEY)
                );
                //damit bin ich auch nicht happy!!
                if (user._id !== data.fromID) {
                    setTyping(true);
                    setTypingUser(data.fromName);
                    setTimeout(() => setTyping(false), 3000);
                }
            });
        }
    }, []);
    return (
        <Container>
            {typing ? (
                    <span>{typingUser} tippt gerade und sieht glücklich aus</span>
                ) :
                null
            }
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100%;
  background-color: #080420;
    span{
    display: flex;
    align-items: center;
    justify-content: center;
      color: white;
  }
`;