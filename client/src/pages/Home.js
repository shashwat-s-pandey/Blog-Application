import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, TextField } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import Blogcard from '../components/Blogcard'

const Home = () => {

  const [tags, setTags] = useState([])
  const [search, setSearch] = useState('')

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete))
  
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
          <Blogcard />
        </Box>
    </div>
  )
}

export default Home