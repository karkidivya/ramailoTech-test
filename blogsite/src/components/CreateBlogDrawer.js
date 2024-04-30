import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function BlogDrawer() {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState('');

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
 

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = () => {
      
  }
  // const handleClose = (event) => {
  //   event.preventDefault();
  //   toggleDrawer(false)
    
  // }
  const tags = [ 'sintific' , 'bestofbest', 'educational', 'innovation', 'enterpreneurship', 'regular', 'english', 'nepali', 'hindi']
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <CloseIcon onClick = {toggleDrawer(false)} />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="author"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="image"
            />
           <TextField
          id="outlined-multiline-static"
          label="content"
          multiline
          rows={4}
          defaultValue="Describe your blog"
        />
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>educational</MenuItem>
          <MenuItem value={20}>startup</MenuItem>
          <MenuItem value={30}>lifestyle</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={tags}
      getOptionLabel={(option) => option.title}
      // defaultValue={}
      renderInput={(params) => (
        <TextField {...params} label="limitTags" placeholder="Favorites" />
      )}
      sx={{ width: '500px' }}
    />
            {/* <FormControlLabel

              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {toggleDrawer(false)}
            >
              Create Blog
            </Button>
            </Box>
    </Box>
  );

  return (
   
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
