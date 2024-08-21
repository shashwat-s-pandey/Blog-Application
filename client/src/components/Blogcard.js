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
import { Box, Modal } from '@mui/material';

export default function Blogcard() {

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

    const handleEdit = () => {

    }

  return (
    <div>
        <Card sx={{ maxWidth: 345, borderRadius: 6 }}>
        <CardMedia
            sx={{ height: 220 }}
            image={demo}
            title="demo"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Firen & Freeze
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Firen (left) and Freeze (right) are the two characters of the game Little Fighter 2. Firen controls
            the fire element and Freeze controls the ice element.
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">
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
                <EditForm />
            </Box>
      </Modal>
    </div>
  );
}
