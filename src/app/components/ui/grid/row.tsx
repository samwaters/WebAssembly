import * as React from 'react'
import styled from 'styled-components'

interface RowProps {
  direction: string
}

const R = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: ${(props: RowProps) => props.direction};
  flex-wrap: wrap;
`

class Row extends React.Component<RowProps> {
  public render() {
    return <R {...this.props}>
      {this.props.children}
    </R>
  }
}

export {Row}
