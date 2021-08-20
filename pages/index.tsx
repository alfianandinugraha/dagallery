import React from 'react'
import type {NextPage} from 'next'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from "@material-ui/core/Box"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import {Image} from "state";
import {useState} from "react";
import ImageItem from "@src/components/ImageItem";
import {Add, Publish} from "@material-ui/icons";
import Drawer from "@src/components/Drawer";

const useStyles = makeStyles((props) => {
  return {
    heading: {
      [props.breakpoints.up('md')]: {
        display: 'none',
      }
    },
    listImage: {
      [props.breakpoints.up('md')]: {
        marginTop: 24,
        width: 888
      },
      [props.breakpoints.up('xl')]: {
        width: 888
      }
    },
    drawer: {
      width: 380,
    },
    drawerPaper: {
      width: 380,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: 'none',
      boxShadow: '-6px 0px 16px -5px rgba(0, 0, 0, 0.25)'
    },
    drawerWrapper: {
      marginTop: 30,
      width: 328
    },
    textFieldRoot: {
      '& .MuiFilledInput-root': {
        backgroundColor: '#F6F6F6',
      }
    }
  }
})

const imageDataGenerator = (
  id: string, name: string, fileName: string, createdAt: number, updatedAt: number
): Image => {
  return {
    id,
    name,
    fileName: 'https://images.unsplash.com/photo-1629220608817-0802c373e110?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    createdAt,
    updatedAt
  }
}

const Home: NextPage = () => {
  const [images] = useState<Image[]>([
    imageDataGenerator('1', 'Hello', '', 0, 0),
    imageDataGenerator('2', 'Hello', '', 0, 0),
    imageDataGenerator('3', 'Hello', '', 0, 0),
    imageDataGenerator('4', 'Hello', '', 0, 0),
  ])

  const classes = useStyles()

  return (
    <Container>
      <Box mb={3} className={classes.heading}>
        <Typography variant="h4" style={{fontWeight: 'bold'}}>Dagallery</Typography>
      </Box>
      <Grid container spacing={2} className={classes.listImage}>
        {images.map((image) => {
          return (
            <ImageItem {...image} key={image.id}/>
          )
        })}
      </Grid>
      <Fab color="primary" aria-label="add" style={{position: 'fixed', bottom: 24, right: 24}}>
        <Add/>
      </Fab>
      <nav className={classes.drawer}>
        <Drawer />
      </nav>
    </Container>
  )
}

export default Home
