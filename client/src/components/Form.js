import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { createBlog } from '../api'
import { useNavigate } from 'react-router'

const Form = () => {

    const [formData, setFormData]  = useState({
        title: '',
        description: '',
        selectedFile: ''
    })

    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete))

    const handleSubmit = async() => {
        console.log(formData)
        console.log(tags)
        try {
            const author = localStorage.getItem("author")
            const response = await createBlog({...formData, author, tags})
            console.log("Blog created successfully", response.data)
            if(response.status >= 200 && response.status < 300) {
                window.location.reload()
            }
            navigate('/')
        }
        catch(error) {
            console.log("Failed: ", error)
            setFormData({title: '', description: '', selectedFile: ''}) 
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

  return (
    <div>
        <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center "
        >
            <Typography fontSize="40px" fontWeight="bold">Create Blog</Typography>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="30vw"
            >
                <TextField
                    id='title'
                    name='title'
                    label='Title'
                    variant='outlined'
                    style={{marginTop: '30px', width: '80%'} }
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    id='description'
                    name='description'
                    label='Description'
                    variant='outlined'
                    style={{marginTop: '30px', width: '80%'} }
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <ChipInput
                    style={{marginTop: '30px', width: '80%'}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Tags"
                    variant='outlined'
                />
                <div style={{marginTop: '30px', width: '80%'}}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setFormData({...formData, selectedFile: base64})}/>
                </div>
                <Button
                    style={{
                        border: '1px solid black', 
                        marginTop: '10%',
                        width: '80%',
                        fontSize: '20px',
                        fontWeight: 'semi-bold',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '15px'
                    }}
                    onClick={handleSubmit}
                >
                    Create
                </Button>
            </Box>
        </Box>
    </div>
  )
}

export default Form