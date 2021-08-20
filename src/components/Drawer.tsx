import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import FileDropzone from "@src/components/FileDropzone";
import {Publish} from "@material-ui/icons";
import MuiDrawer from "@material-ui/core/Drawer"
import makeStyles from "@material-ui/core/styles/makeStyles";

interface DrawerProps {
}

const useStyles = makeStyles((props) => {
  return {
    drawerPaper: {
      width: 380,
      display: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      border: 'none',
      boxShadow: '-6px 0px 16px -5px rgba(0, 0, 0, 0.25)',
      [props.breakpoints.up('md')]: {
        display: 'flex',
      }
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

const Drawer = (props: DrawerProps) => {
  const [title, setTitle] = useState("")
  const [fileName, setFileName] = useState("")
  const classes = useStyles()

  const submitForm = () => {
    console.log({title, fileName})
  }

  return (
    <MuiDrawer
      variant="permanent"
      anchor="right"
      open={true}
      container={undefined}
      classes={{
        paper: classes.drawerPaper
      }}
    >
    <Grid container className={classes.drawerWrapper} direction="column" spacing={3}>
      <Grid item>
        <Typography style={{fontSize: 42, fontWeight: 'bold'}} align="center">Dagallery</Typography>
      </Grid>
      <Grid item>
        <TextField
          type="text"
          label="Title"
          fullWidth
          variant="filled"
          className={classes.textFieldRoot}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          type="text"
          label="Filename"
          fullWidth
          variant="filled"
          className={classes.textFieldRoot}
          onChange={(e) => {
            setFileName(e.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <FileDropzone/>
      </Grid>
      <Grid item>
        <Button
            startIcon={<Publish/>}
            fullWidth
            color="primary"
            variant="contained"
            onClick={submitForm}
        >Upload</Button>
      </Grid>
    </Grid>
  </MuiDrawer>)
}

export default Drawer