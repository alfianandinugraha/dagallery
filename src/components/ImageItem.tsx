import React, {HTMLAttributes, useState} from 'react'
import {Image} from "state";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Fab from "@material-ui/core/Fab";
import {CloudDownload, Delete} from "@material-ui/icons";
import axios from "axios";
import {Button, CircularProgress} from "@material-ui/core";

interface ImageItemProps extends Image {
  onDelete?: (image: Image) => void
}

const useClasses = makeStyles((props) => {
  return {
    grid: {
      height: 144,
      borderRadius: 6,
      position: 'relative',
      cursor: 'pointer',
      [props.breakpoints.up('md')]: {
        height: 180,
      }
    },
    img: {
      borderRadius: 6,
      objectFit: 'cover',
      height: '100%',
      width: '100%'
    },
    background: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 'calc(100% - 16px)',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, #222222 100%)',
      height: 54,
      borderRadius: '0 0 6px 6px',
      margin: 8,
      color: 'white',

      '& p': {
        marginLeft: 16,
        fontSize: 12,
        [props.breakpoints.up('md')]: {
          fontSize: 16,
        }
      },
      '& span': {
        marginLeft: 16,
      }
    },
    buttonDownload: {
      position: 'absolute',
      top: 16,
      left: 16
    }
  }
})

const ImageItem = (props: ImageItemProps) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const classes = useClasses()

  const deleteImageHandler = async () => {
    try {
      setIsLoadingDelete(true)
      await axios({
        method: 'DELETE',
        url: `/api/images/${props.id}`
      })
      const newProps = {...props}
      delete newProps.onDelete
      props.onDelete && props.onDelete(newProps)
    } catch (err) {
      console.log(err)
      setIsLoadingDelete(false)
    }
  }

  const downloadImage = async () => {
    try {
      const res = await axios
        .get(props.url, {responseType: "arraybuffer"})
        .then((response) => {
          return Buffer.from(response.data, 'binary').toString('base64')
        })
      const anchor = document.createElement("a")
      anchor.download = props.fileName
      anchor.setAttribute('href', res)
      anchor.click()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid
      item
      key={props.id}
      xs={6}
      sm={4}
      className={classes.grid}
    >
      <Fab
        size={"small"}
        color="secondary"
        onClick={isLoadingDelete ? undefined : deleteImageHandler}
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: 'white'
        }}
      >
        {
          isLoadingDelete ? (<CircularProgress size={20} color="inherit"/>) : (<Delete fontSize="small"/>)
        }
      </Fab>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonDownload}
        onClick={downloadImage}
      >
        <CloudDownload fontSize="small" style={{marginRight: 8}}/>
        <Typography variant="caption">
          Download
        </Typography>
      </Button>
      <img src={props.url} alt={props.title} className={classes.img}/>
      <div className={classes.background}>
        <Typography color="inherit">{props.title}</Typography>
        <Typography color="inherit" variant="caption">
          {props.fileName.length > 30 ? `${props.fileName.slice(0, 30)}...` : props.fileName}
        </Typography>
      </div>
    </Grid>
  )
}

export default ImageItem