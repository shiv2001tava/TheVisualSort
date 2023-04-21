import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { sortingAlgorithms } from '../common/config'
import { useData } from '../common/store'
import shallow from 'zustand/shallow'
import { AiFillGithub } from 'react-icons/ai'

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export function NavBar() {
  const classes = useStyles()

  const [algorithm, setAlgorithm] = useData(
    (state) => [state.algorithm, state.setAlgorithm],
    shallow
  )

  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',

          alignItems: 'center',
          backgroundColor: '#3f51b5',
        }}
      >
        <div
          style={{
            marginLeft: '36.5%',
            display: 'flex',

            alignItems: 'center',
            backgroundColor: '#3f51b5',
          }}
        >
          <a href='https://ibb.co/ySLKzZW'>
            <img
              src='https://i.ibb.co/rsnqBz4/aasdasdassa.png'
              alt='aasdasdassa'
              style={{
                BoxShadow: '7px 7px 10px black',
                hight: '75px',
                width: '75px',
              }}
            ></img>
          </a>
          <h1
            style={{
              color: 'white',
              textShadow: '7px 7px 10px black',
            }}
          >
            THE ViSUAL SORT
          </h1>
        </div>
      </div>
      <AppBar position='static' color='default'>
        <Tabs
          value={algorithm}
          onChange={(event, id) => setAlgorithm(id)}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          {sortingAlgorithms.map((algorithm) => (
            <Tab
              label={algorithm.title}
              {...a11yProps(0)}
              key={algorithm.title}
            />
          ))}
          <Tab label='All' {...a11yProps(6)} />
        </Tabs>
      </AppBar>
    </div>
  )
}
