import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <h1>
        Hallo, <span>{userName}!</span>
      </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #0d0d30;
  }
`;