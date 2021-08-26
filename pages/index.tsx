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
import {ApiResponse, ImageFirebase} from "api";
import {useAtom} from "jotai";
import {imageStore} from "@src/store/imageStore";
import {CircularProgress, TextField} from "@material-ui/core";
import debounce from "@src/helpers/debounce";

const useStyles = makeStyles((props) => {
  return {
    heading: {
      [props.breakpoints.up('md')]: {
        display: 'none',
      }
    },
    listImage: {
      position: 'relative',
      minHeight: '100vh',
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
    },
    emptyState: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }
})

const debounceSearchInput = debounce<() => void>((param) => {
  param()
}, 500)

const Home: NextPage<ApiResponse<Image[]>> = (props) => {
  const classes = useStyles()
  const [imagesStore, setImagesStore] = useAtom(imageStore)
  const [search, setSearch] = useState("")
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [images, setImages] = useState<Image[]>(props.data)

  const hasImages = !!imagesStore.length

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setIsLoadingSearch(true)
    debounceSearchInput(async () => {
      const queryParam = {
        q: e.target.value
      }
      const responseSearch = await axios
        .get<ApiResponse<Image[]>>('/api/images', {
          params: queryParam
        })
        .then((res) => {
          return res.data.data
        })
      setIsLoadingSearch(false)
      setImages(responseSearch)
    })
  }

  useEffect(() => {
    setImagesStore(props.data)
  }, [props.data, setImagesStore])

  useEffect(() => {
    setImages(imagesStore)
  }, [imagesStore])

  return (
    <Container>
      <Box mb={3} className={classes.heading}>
        <Typography variant="h4" style={{fontWeight: 'bold'}}>Dagallery</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.listImage}
        style={{marginTop: hasImages ? 24 : 0}}
      >
        {!hasImages && (
          <Typography variant="h4" className={classes.emptyState}>No Images Found</Typography>
        )}
        {isLoadingSearch && (
          <Grid container direction="column" justifyContent="center" className={classes.emptyState}>
            <CircularProgress />
            <Typography>Loading data</Typography>
          </Grid>
        )}
        {hasImages && (
          <Grid item>
            <TextField
              label="Search by title"
              type="search"
              value={search}
              onChange={searchHandler}
            />
          </Grid>
        )}
        {!isLoadingSearch && (
          <Grid item>
            <Grid container spacing={2}>
              {images.map((image) => {
                return (
                  <ImageItem
                    {...image}
                    key={image.id}
                    onDelete={(image: Image) => {
                    const newImages = imagesStore.filter((item) => item.id !== image.id)
                      setImagesStore(newImages)
                    }}
                  />
                )
              })}
            </Grid>
          </Grid>
        )}
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
    const response = await axios.get<ApiResponse<ImageFirebase[]>>('http://localhost:3000/api/images')
      .then((res) => {
        return res.data
      })
    props = {
      message: response.message,
      data: response.data
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
