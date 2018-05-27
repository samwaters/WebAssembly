import * as React from 'react'
import styled from 'styled-components'

interface LayoutProps {

}

const L = styled.div`

`

class Layout extends React.Component<LayoutProps> {
  public render() {
    return <L>
      {this.props.children}
    </L>
  }
}

export {Layout}
