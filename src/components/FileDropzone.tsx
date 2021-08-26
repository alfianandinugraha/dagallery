import React from 'react'
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {CircularProgress} from "@material-ui/core";
import clsx from "clsx";

interface FileDropzoneProps {
  base64?: string
  isLoading?: boolean
  isActive?: boolean
}

const useStyles = makeStyles((props) => {
  return {
    root: {
      width: '100%',
      height: 166,
      borderRadius: 4,
      backgroundColor: '#F6F6F6',
      cursor: 'pointer',
      padding: 12,
      '& img': {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 4
      },
      '& *': {
        pointerEvents: 'none'
      }
    },
    active: {
      backgroundColor: "#5d75c3",
      color: 'white'
    }
  }
})

const FileDropzone = (props: FileDropzoneProps) => {
  const classes = useStyles()

  return (
    <Grid
      container
      className={clsx(classes.root, props.isActive ? classes.active : null)}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.base64 ? (
          <img src={props.base64} alt="preview image"/>
        ) : (
          <Typography>Drop image here</Typography>
        )}
        {props.isLoading && (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  )
}

export default FileDropzone