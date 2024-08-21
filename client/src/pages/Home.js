import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import Blogcard from '../components/Blogcard'
import { getAllBlogs } from '../api'

const Home = () => {

  const [tags, setTags] = useState([])
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState([])

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete))

    useEffect(() => {
      const getBlogs = async() => {
        try {
          const response = await getAllBlogs()
          console.log("All Blogs: ", response.data)
          setBlogs(response.data)
        }
        catch(error) {
          console.log("Failed: ", error)
        }
      }

      getBlogs()
    }, [])
  
  return (
    <div>
        <Navbar/>
        <Box sx={{padding: 4}}>
          <Box>
            <TextField
              name='search'
              label="Search Blogs"
              variant="outlined"
              value={search}
              onChange={(e) =>  setSearch(e.target.value)}
              style={{marginRight: 20}}
            />
            <ChipInput
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search tags"
              variant='outlined'
            />
            <Button 
              variant='outlined'
              sx={{
                backgroundColor: 'black',
                color: 'white',
                mt: 1,
                ml: 3,
                '&:hover': {
                  backgroundColor: '#FFD42F',
                  color: 'black'
                } 
              }}
            >
              Search
            </Button>

          </Box>
          {/* <Blogcard /> */}
          <Grid container alignItems={'stetch'} spacing={2} m={4}>
              <Typography variant='h5' mb={5}>All Blogs</Typography>
              {/* container grid */}
              <Grid container alignItems={'stetch'} spacing={2}>
                {
                  blogs.map((blog) => (
                    <Grid key={blog._id} xs={12} sm={6} md={6} lg={4}>
                      <Blogcard data={blog} />
                    </Grid>
                  ))
                }
              </Grid>
          </Grid>
        </Box>
    </div>
  )
}

export default Home