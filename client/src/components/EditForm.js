import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { editBlog } from '../api'
import { useNavigate } from 'react-router-dom'

const EditForm = ({data}) => {

    const [formData, setFormData]  = useState({
        title: data.title,
        description: data.description,
        selectedFile: data.selectedFile
    })

    const [tags, setTags] = useState(data.tags)
    const navigate = useNavigate()

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete))

    const handleSubmit = async() => {
        console.log(formData)
        console.log(tags)
        try {
            const id = data._id;
            const response = await editBlog(id, {...formData, tags})
            console.log("Blog edited successfully", response.data)
            window.location.reload()
            // navigate('/')
        }
        catch(error) {
            console.log("Failed: ", error.message)
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
            <Typography fontSize="40px" fontWeight="bold">Edit Blog</Typography>
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
                    Edit
                </Button>
            </Box>
        </Box>
    </div>
  )
}

export default EditForm