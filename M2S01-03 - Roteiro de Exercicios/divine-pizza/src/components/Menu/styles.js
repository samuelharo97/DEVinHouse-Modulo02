import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  text-align: center;
  align-self: center;
  justify-content: center;

  ul {
    width: 60%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    justify-content: center;
    gap: 30px;
  }
`
