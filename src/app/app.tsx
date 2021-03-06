import * as React from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux'

import {IAction, IConnectedProps} from 'actions/action.interface'
import {Prime} from 'components/prime'
import {Button} from 'components/ui/button'
import {Col, Row} from 'components/ui/grid'
import {Header} from 'components/ui/header'
import {Layout} from 'components/ui/layout'
import {IAppState} from 'reducers/index'
import {ThemeProvider} from 'styled-components'
import {reset} from 'theme/reset'
import {theme} from 'theme/theme'

interface IAppComponent extends IConnectedProps {
  btnClick: () => void;
  count: number;
}

class App extends React.Component<IAppComponent> {
  public componentDidMount() {
    reset()
  }

  public render() {
    return <ThemeProvider theme={theme}>
      <Layout>
        <Header title='WebAssembly'>
        </Header>
        <Row direction='row'>
          <Col md={6} xs={12}>
            <Prime />
          </Col>
          <Col md={6} xs={12}>
            <p>Count: {this.props.count}</p>
            <Button onClick={() => this.props.btnClick()}>Hello</Button>
          </Col>
        </Row>
      </Layout>
    </ThemeProvider>
  }
}

const AppHot = hot(module)(App)

const AppComponent = connect(
  (state: IAppState) => ({
    count: state.count.count,
  }),
  (dispatch: (action: IAction) => void) => ({
    btnClick: () => { dispatch({type: 'COUNT', payload: 123123}) },
  }),
)(AppHot)

export {AppComponent}
