import * as React from 'react'

import {Prime} from 'components/prime'
import { AppBar, Avatar, Container, Grid, Toolbar, Typography } from "@mui/material"
import CodeIcon from '@mui/icons-material/Code'
import { ThemeProvider } from "styled-components"
import { Reset } from "styled-reset"
import { theme } from "theme/theme"

import { List } from "components/list";
import { Projects } from "components/projects";

const App = () => (<ThemeProvider theme={theme}>
  <Reset />
  <Container>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            component="a"
            href="#/"
            sx={{ color: "inherit", flexGrow: 1, textDecoration: "none" }}
            variant="h6"
          >
            Web Assembly
          </Typography>
          <Avatar />
        </Toolbar>
      </Container>
    </AppBar>
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <List />
      </Grid>
      <Grid item xs={12} md={9}>
        <Projects />
      </Grid>
    </Grid>
  </Container>
</ThemeProvider>)

export { App }
