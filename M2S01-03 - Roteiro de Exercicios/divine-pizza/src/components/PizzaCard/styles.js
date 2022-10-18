import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px black;
  border-radius: 4px;
  width: 300px;

  ul {
    list-style: none;
    display: flex;
    gap: 1px;
  }

  img {
    border-radius: 4px 4px 0 0;
    height: 250px;
  }
`
