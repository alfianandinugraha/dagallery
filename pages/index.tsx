import type {NextPage} from 'next'
import {Box, Container, Fab, Grid, Typography} from "@material-ui/core";
import {Image} from "state";
import {useState} from "react";
import ImageItem from "@src/components/ImageItem";
import {Add} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";

const useClasses = makeStyles((props) => {
  return {
    heading: {
      [props.breakpoints.up('md')]: {
        display: 'none',
      }
    },
    listImage: {
      [props.breakpoints.up('md')]: {
        marginTop: 24,
      }
    }
  }
})

const imageDataGenerator = (
  id: string, name: string, fileName: string, createdAt: number, updatedAt: number
): Image => {
  return {
    id,
    name,
    fileName: 'https://images.unsplash.com/photo-1629220608817-0802c373e110?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    createdAt,
    updatedAt
  }
}

const Home: NextPage = () => {
  const [images] = useState<Image[]>([
    imageDataGenerator('1', 'Hello', '', 0, 0),
    imageDataGenerator('2', 'Hello', '', 0, 0),
    imageDataGenerator('3', 'Hello', '', 0, 0),
    imageDataGenerator('4', 'Hello', '', 0, 0),
  ])

  const classes = useClasses()

  return (
    <Container>
      <Box mb={3} className={classes.heading}>
        <Typography variant="h4" style={{fontWeight: 'bold'}}>Dagallery</Typography>
      </Box>
      <Grid container spacing={2} className={classes.listImage}>
        {images.map((image) => {
          return (
            <ImageItem {...image} key={image.id}/>
          )
        })}
      </Grid>
      <Fab color="primary" aria-label="add" style={{position: 'fixed', bottom: 24, right: 24}}>
        <Add />
      </Fab>
    </Container>
  )
}

export default Home
