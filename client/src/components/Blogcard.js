import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import demo from '../images/demo.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import EditForm from './EditForm';
import { Box, Grid, Modal } from '@mui/material';
import { deleteBlog } from '../api';

export default function Blogcard({data}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async() => {
        try {
            const response = await deleteBlog(data._id)
            console.log("Blog deleted successfully!", response.data)
            if(response.status == 200) {
                window.location.reload()
            }
        }
        catch(error){
            console.log("Failed: ", error.message)
        }
    }

    const handleEdit = () => {

    }

  return (
    <div>
        <Card sx={{ maxWidth: 345, borderRadius: 6 }}>
        <CardMedia
            sx={{ height: 220 }}
            image={data.selectedFile}
            title="image"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {data.description}
            </Typography>
            <Typography
                color='text.secondary'
                sx={{fontSize: '20px', lineHeight: '25px', margin: '5px 0', fontWeight: 400}}
            >
                {data.tags.map((tag) => `#${tag}`)}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={handleDelete}>
                <DeleteIcon/>
            </Button>
            <Button size="small" onClick={handleOpen}>
                <EditIcon/>
            </Button>
        </CardActions>
        </Card>

        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <EditForm data={data}/>
            </Box>
      </Modal>
    </div>
  );
}
