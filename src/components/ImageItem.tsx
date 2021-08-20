import React from 'react'
import {Image} from "state";
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

interface ImageItemProps extends Image {
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
    <Grid item key={props.id} xs={6} sm={4} className={classes.grid}>
      <img src={props.fileName} alt={props.name} className={classes.img}/>
      <div className={classes.background}>
        <Typography color="inherit">{props.name}</Typography>
      </div>
    </Grid>
  )
}

export default ImageItem