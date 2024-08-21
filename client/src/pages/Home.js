import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import Blogcard from '../components/Blogcard'
import { getAllBlogs, getBlogBySearch } from '../api'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [tags, setTags] = useState([])
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const [inputValue, setInputValue] = useState('');

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete))

    const navigate = useNavigate()

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

  const handleSearch = async() => {
    if(search.trim() || tags.length > 0) {
      console.log(search)
      console.log(tags)
      const response = await getBlogBySearch({search, tags: tags.join(',')})
      console.log(response)
      setSearchResult(response.data.blogs)
      navigate(`/blog/search?searchQuery=${search || 'none'}&tags=${tags.join() || 'none'}`)
    }
    else {
      navigate('/');
    }
  }
  
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
              onChange={(e) => setSearch(e.target.value)}
              style={{marginRight: 20}}
            />
            <ChipInput
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search tags"
              variant='outlined'
              // InputLabelProps={{
              //   style: {
              //     shrink: true,
              //     top: '50%', // Center the label vertically
              //     transform: 'translateY(-50%)', // Adjust the position to perfectly center it
              //     left: '15px',
              //   },
              // }}
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
              onClick={handleSearch}
            >
              Search
            </Button>

          </Box>
          {/* <Blogcard /> */}
          <Grid container alignItems={'stretch'} spacing={2} m={4}>
            {
              searchResult.length > 0 ? (
                <>
                <Typography variant='h5' mb={5}>Search Result ({searchResult.length})</Typography>
                <Grid container alignItems={'stretch'} spacing={2}>
                  {
                    searchResult?.map((blog) => (
                      <Grid key={blog._id} xs={12} sm={6} md={6} lg={4}>
                        <Blogcard data={blog} />
                      </Grid>
                    ))
                  }
                </Grid>
                </>
              ) : (
                <>
                <Typography variant='h5' mb={5}>All Blogs</Typography>
                <Grid container alignItems={'stretch'} spacing={2}>
                  {
                    blogs.map((blog) => (
                      <Grid key={blog._id} xs={12} sm={6} md={6} lg={4}>
                        <Blogcard data={blog} />
                      </Grid>
                    ))
                  }
                </Grid>
                </>
              )
            }
          </Grid>
        </Box>
    </div>
  )
}

export default Home