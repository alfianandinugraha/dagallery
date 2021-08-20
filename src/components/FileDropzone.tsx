import React from 'react'
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

interface FileDropzoneProps {
}

const useStyles = makeStyles((props) => {
  return {
    root: {
      width: '100%',
      height: 166,
      borderRadius: 4,
      backgroundColor: '#F6F6F6',
      cursor: 'pointer'
    }
  }
})

const FileDropzone = (props: FileDropzoneProps) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems="center">
      <Grid item>
        <Typography>Drop image here</Typography>
      </Grid>
    </Grid>
  )
}

export default FileDropzone