import React, {HTMLAttributes} from 'react'
import {Image} from "state";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Fab from "@material-ui/core/Fab";
import {Delete} from "@material-ui/icons";

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
      backgroundImage: 'linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, #222222 100%)',
      height: 46,
      borderRadius: '0 0 6px 6px',
      margin: 8,
      color: 'white',
      alignItems: 'center',

      '& p': {
        marginLeft: 16,
        fontSize: 12,
        [props.breakpoints.up('md')]: {
          fontSize: 16,
        }
      }
    }
  }
})

const ImageItem = (props: ImageItemProps) => {
  const classes = useClasses()

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
        onClick={() => {
          const newProps = {...props}
          delete newProps.onDelete
          props.onDelete && props.onDelete(newProps)
        }}
        style={{
          position: 'absolute',
          right: 16,
          top: 16
        }}
      ><Delete fontSize="small"/></Fab>
      <img src={props.url} alt={props.title} className={classes.img}/>
      <div className={classes.background}>
        <Typography color="inherit">{props.title}</Typography>
      </div>
    </Grid>
  )
}

export default ImageItem