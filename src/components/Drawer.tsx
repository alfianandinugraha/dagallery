import React, {useEffect, useMemo, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import FileDropzone from "@src/components/FileDropzone";
import {Publish} from "@material-ui/icons";
import MuiDrawer from "@material-ui/core/Drawer"
import makeStyles from "@material-ui/core/styles/makeStyles";
import {convertBase64} from "@src/helpers/base64";

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
  const [file, setFile] = useState<File|null>(null)
  const [base64, setBase64] = useState<string>("")
  const [isLoadingConvert, setIsLoadingConvert] = useState(false)
  const classes = useStyles()

  const submitForm = () => {
    if (!file) {
      alert('Please upload image')
      return
    }
    console.log({title, fileName, file})
  }

  useEffect(() => {
    if (!file) {
      return
    }
    setFileName(file.name)
    convertBase64(file, (payload) => {
      setBase64(payload)
      setIsLoadingConvert(false)
    })
  }, [file])

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
          value={title}
          className={classes.textFieldRoot}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
          value={fileName}
          className={classes.textFieldRoot}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setFileName(e.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <input
          type="file"
          id="input-image"
          style={{
            visibility: 'hidden',
            height: 0,
            display: 'none'
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target
            if (!files || !files.length) {
              return
            }
            setFile(files[0])
            setIsLoadingConvert(true)
          }}
        />
        <label htmlFor="input-image">
          <FileDropzone base64={base64} isLoading={isLoadingConvert}/>
        </label>
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