import React from "react";
import styled from '@emotion/styled'
import { DateSelect } from "./DateSelect";

export const Header = () => {
  const { Container, Title, ContainerSelect } = Header
  return (
    <Container>
      <div></div>
      <Title>Covid Daily Cases</Title>
      <ContainerSelect>
        <DateSelect />
      </ContainerSelect>
    </Container>
  )
}

Header.Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`

Header.Title = styled.h1`
  text-align: center;
`

Header.ContainerSelect = styled.div`
  justify-self:end;
  width: 200px;
`