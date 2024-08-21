import React, { useState } from 'react'
import {Box, Button, TextField, Typography} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import demo from '../images/demo2.jpg'
import { signin } from '../api'

const Signin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSignIn = async(e) => {
        console.log(formData);
        try {
            const response = await signin(formData)
            console.log("Sign in successful", response.data)
            localStorage.setItem("author", response.data.result._id.toString())
            navigate('/') // after signing in, will redirect user to home page
        }
        catch(error) {
            console.log("Sign in failed: ", error)
            setFormData({email: '', password: ''})
        }
    }

  return (
    <Box display='flex' height='100vh'>
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={'30vw'} >
                <Typography fontSize="50px" fontWeight="bold">Sign In</Typography>
                <TextField
                    id='email'
                    name='email'
                    label='Email'
                    variant='outlined'
                    style={{marginTop: '30px', width: '80%'}}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <TextField
                    id='password'
                    name='password'
                    label='Password'
                    variant='outlined'
                    style={{marginTop: '30px', width: '80%'}}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <Link to="/signup" style={{textDecoration: 'underline'}}>
                    <Typography
                        style={{
                            marginTop: '20px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            '&hover' : {
                                textDecoration: 'underline'
                            }
                        }} 
                    >
                        Create account?
                    </Typography>
                </Link>
                <Button
                    style={{
                        border: '1px solid black',
                        marginTop: '10%',
                        width: '80%',
                        fontSize: '20px',
                        fontWeight: 'semi-bold',
                        color: 'white',
                        borderRadius: '15px',
                        backgroundColor: 'black'
                    }}
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Box>
        </Box>
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src={demo} style={{maxHeight: '60vh', maxWidth: '100%'}} alt='demo'/>
        </Box>
    </Box>
  )
}

export default Signin