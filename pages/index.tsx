import React, {PropsWithChildren, useEffect} from 'react'
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
import axios from "axios";
import {ApiResponseArray, ImageResponse} from "api";
import {useAtom} from "jotai";
import {imageStore} from "@src/store/imageStore";

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

const Home: NextPage<ApiResponseArray<Image>> = (props) => {
  const classes = useStyles()
  const [images, setImages] = useAtom(imageStore)

  useEffect(() => {
    setImages(props.data)
  }, [props.data, setImages])

  return (
    <Container>
      <Box mb={3} className={classes.heading}>
        <Typography variant="h4" style={{fontWeight: 'bold'}}>Dagallery</Typography>
      </Box>
      <Grid container spacing={2} className={classes.listImage}>
        {images.map((image) => {
          return (
            <ImageItem {...image} key={image.id} onDelete={(payload) => {
              console.log(payload)
            }}/>
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

export const getServerSideProps = async () => {
  let props = {}
  try {
    const response = await axios.get<ApiResponseArray<ImageResponse>>('http://localhost:3000/api/images')
      .then((res) => {
        return res.data
      })
    props = {
      message: response.message,
      data: response.data.map((image) => {
        return {
          ...image,
          url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${image.version}/${image.publicId}.${image.format}`,
        }
      })
    }
  } catch(err) {
    console.log(err)
    props = {
      message: 'failed',
      data: []
    }
  }

  return {
    props: props
  }
}

export default Home
