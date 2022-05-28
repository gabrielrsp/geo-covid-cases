import React from "react";
import styled from '@emotion/styled'
import { DateSelect } from "./DateSelect";
import { Radio } from "./Radio";

export const Header = () => {
  const { Container, Title, ContainerSelect } = Header
  return (
    <Container>
      <div></div>
      <div>
      <Title>Covid Daily Cases</Title>
      </div>
      <ContainerSelect>
        <DateSelect />
        <Radio/>
      </ContainerSelect>
    </Container>
  )
}

Header.Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  margin: 20px;
`

Header.Title = styled.h1`
  text-align: center;
`

Header.ContainerSelect = styled.div`
  display: flex;
  justify-content: end;
  align-items: center
`