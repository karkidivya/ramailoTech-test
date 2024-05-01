import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { Autocomplete, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function BlogDrawer() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
 

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.post('http://localhost:5000/blog/addblog', {
      title: data.get('title'),
      author: data.get('author'),
      image: data.get('image'),
      content: data.get('content'),
      category: category,
      tags : selectedTags
      })
      console.log({
        title: data.get('title'),
        author: data.get('author'),
        image: data.get('image'),
        content: data.get('content'),
        category: category,
        tags : selectedTags
      });
  }
  // const handleClose = (event) => {
  //   event.preventDefault();
  //   toggleDrawer(false)
    
  // }
  const tags = [ 'scientific' , 'bestofbest', 'educational', 'innovation', 'enterpreneurship', 'regular', 'english', 'nepali', 'hindi']
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
          name = "content"
          defaultValue="Describe your blog"
        />
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value={1}>educational</MenuItem>
          <MenuItem value={2}>startup</MenuItem>
          <MenuItem value={3}>lifestyle</MenuItem>
          <MenuItem value={4}>Cooking</MenuItem>
          <MenuItem value={5}>Travel</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={tags}
      onChange={handleTagChange}
      getOptionLabel={(tags) => tags}
      // defaultValue={tags[1]}
      renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder="Favorites" />
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
      <Button onClick={toggleDrawer(true)}>Create New Blog</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
