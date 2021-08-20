import React from 'react'
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

interface FileDropzoneProps {
  base64?: string
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
      }
    }
  }
})

const FileDropzone = (props: FileDropzoneProps) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems="center">
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
      </Grid>
    </Grid>
  )
}

export default FileDropzone