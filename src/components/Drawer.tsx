import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, CircularProgress, TextField, makeStyles} from "@material-ui/core";
import FileDropzone from "@src/components/FileDropzone";
import {Publish} from "@material-ui/icons";
import MuiDrawer from "@material-ui/core/Drawer"
import {convertBase64} from "@src/helpers/base64";
import axios, {AxiosResponse} from "axios";
import {ApiResponse, ImageFirebase} from "api";
import {useAtom} from "jotai";
import {imageStore} from "@src/store/imageStore";
import {Image} from "state";

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
    },
    error: {
      color: props.palette.secondary.main,
    }
  }
})

const supportedFile = "image/"
const Drawer = (props: DrawerProps) => {
  const [title, setTitle] = useState("")
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState<File|null>(null)
  const [base64, setBase64] = useState<string>("")
  const [isLoadingConvert, setIsLoadingConvert] = useState(false)
  const [isLoadingRequest, setIsLoadingRequest] = useState(false)
  const [isSupportedFileFormat, setIsSupportedFileFormat] = useState(true)
  const [isDragActive, setIsDragActive] = useState(false)
  const [images, setImages] = useAtom(imageStore)
  const classes = useStyles()

  const submitForm = () => {
    if (!file) {
      alert('Please upload image')
      return
    }
    const formData = new FormData()
    formData.append("title", title)
    formData.append("fileName", fileName)
    formData.append("file", file)
    setIsLoadingRequest(true)
    axios({
      method: 'POST',
      url: '/api/images',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res: AxiosResponse<ApiResponse<Image>>) => {
      const { data } = res.data
      setImages([data, ...images])
      setTitle("")
      setFileName("")
      setFile(null)
      setBase64("")
    }).finally(() => {
      setIsLoadingRequest(false)
    })
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
          disabled={isLoadingRequest}
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
          disabled={isLoadingRequest}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setFileName(e.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <input
          type="file"
          accept="image/*"
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
        <label
          htmlFor="input-image"
          onDragOver={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setIsDragActive(true)
          }}
          onDragLeave={(e) => {
            e.stopPropagation()
            console.log(e)
            setIsDragActive(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragActive(false)
            const { files } = e.dataTransfer
            const isSupport = files[0].type.startsWith(supportedFile)
            if (!isSupport) {
              setIsSupportedFileFormat(false)
              return
            }
            setIsSupportedFileFormat(true)
            setFile(files[0])
            setIsLoadingConvert(true)
          }}
        >
          <FileDropzone
            isActive={isDragActive}
            base64={base64}
            isLoading={isLoadingConvert}
          />
        </label>
        {!isSupportedFileFormat && (
          <Typography
            variant="caption"
            className={classes.error}
          >
            Format file not supported, please upload PNG, JPG, JPEG, or SVG
          </Typography>
        )}
      </Grid>
      <Grid item>
        <Button
            startIcon={isLoadingRequest ? null : <Publish/>}
            fullWidth
            color="primary"
            variant="contained"
            onClick={isLoadingRequest ? undefined : submitForm}
            style={{
              color: 'white'
            }}
        >
          {isLoadingRequest ? (<CircularProgress color="inherit" size={24}/>) : 'Upload'}
        </Button>
      </Grid>
    </Grid>
  </MuiDrawer>)
}

export default Drawer