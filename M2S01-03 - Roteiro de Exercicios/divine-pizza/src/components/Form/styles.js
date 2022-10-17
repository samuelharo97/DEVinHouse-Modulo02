import styled from 'styled-components'

export const Container = styled.form`
  display: flex;
  width: 60%;
  margin: auto;
  border: 1px solid black;
  section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 65%;
    padding: 40px;

    label {
      text-align: left;
    }
    input {
      width: 80%;
      height: 38px;
      text-align: center;
    }

    button {
      align-self: center;
    }
  }
  aside {
    width: 35%;
    height: 400px;
    padding: 40px;
    h4 {
      margin-bottom: 24px;
    }
  }

  .submit {
    width: 40%;
    justify-self: center;
  }
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const RowWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`
