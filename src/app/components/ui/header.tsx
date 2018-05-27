import * as React from 'react'
import styled from 'styled-components'

interface HeaderProps {
  title: string
}

const H = styled.header`
  background-color: ${(props) => props.theme.primary};
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
`

const TitleArea = styled.div`
  flex: 1;
  > h1 {
    color: ${(props) => props.theme.text};
    margin: 0;
  }
`

const IconArea = styled.div`
  min-width: 50px;
`

class Header extends React.Component<HeaderProps> {
  public render() {
    return <H>
      <TitleArea><h1>{this.props.title}</h1></TitleArea>
      <IconArea>{this.props.children}</IconArea>
    </H>
  }
}

export {Header}
