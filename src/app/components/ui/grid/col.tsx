import * as React from 'react'
import styled from 'styled-components'

interface ColProps {
  xs?: number,
  xsOffset?: number,
  sm?: number,
  smOffset?: number,
  md?: number,
  mdOffset?: number,
  lg?: number,
  lgOffset?: number,
  xl?: number,
  xlOffset?: number
}

interface Widths {
  [key: number]: string
}

const widths: Widths = {
  1: '8.33333333%',
  2: '16.66666666%',
  3: '25%',
  4: '33.33333333%',
  5: '41.66666667%',
  6: '50%',
  7: '58.33333333%',
  8: '66.66666667%',
  9: '75%',
  10: '83.33333333%',
  11: '91.66666667%',
  12: '100%',
}

const C = styled.div`
  flex: 0 0 auto;
  @media(min-width: 0px) {
    padding: 0 8px;
    margin-left: ${(props: ColProps) => widths[props.xsOffset]};
    width: ${(props: ColProps) => widths[props.xs]};
  }
  @media(min-width: 600px) {
    padding: 0 8px;
    margin-left: ${(props: ColProps) => widths[props.smOffset]};
    width: ${(props: ColProps) => widths[props.sm]};
  }
  @media(min-width: 1024px) {
    padding: 0 16px;
    margin-left: ${(props: ColProps) => widths[props.mdOffset]};
    width: ${(props: ColProps) => widths[props.md]};
  }
  @media(min-width: 1440px) {
    padding: 0 16px;
    margin-left: ${(props: ColProps) => widths[props.lgOffset]};
    width: ${(props: ColProps) => widths[props.lg]};
  }
  @media(min-width: 1920px) {
    padding: 0 16px;
    margin-left: ${(props: ColProps) => widths[props.xlOffset]};
    width: ${(props: ColProps) => widths[props.xl]};
  }
`

class Col extends React.Component<ColProps> {
  public render() {
    return <C {...this.props}>
      {this.props.children}
    </C>
  }
}

export {Col}
