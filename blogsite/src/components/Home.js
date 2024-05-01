import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ButtonAppBar from './AppBar'
import BlogCard from './BlogCard.js'
import './home.css'
import BlogDrawer from './CreateBlogDrawer.js';
import { useNavigate } from "react-router-dom";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
const Home = () => {
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [filteredBlogData, setFilteredBlogData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const tags = [ 'scientific' , 'bestofbest', 'educational', 'innovation', 'enterpreneurship', 'regular', 'english', 'nepali', 'hindi']

  useEffect(() => {
    fetchBlogData();
  }, [category, selectedTags]);

  const navigate = useNavigate()

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blog/getBlogs')
      setBlogData(response.data);
      filterBlogData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  const filterBlogData = (data) => {
    let filteredData = data;
    if (category) {
      
      filteredData = filteredData.filter(blog => blog.category == category);
    }
    if (selectedTags.length > 0) {
      filteredData = filteredData.filter(blog => blog.tags.some(tag => selectedTags.includes(tag)));
    }
    console.log(filteredData,"csbcj")
    setBlogData(filteredData);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category,'jdvj')
    filterBlogData(blogData);
  };

  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue);
    filterBlogData(blogData);
  };
  
  console.log(blogData)
  return (
    <div>
      <ButtonAppBar/>
      <div className='filters'>
        <BlogDrawer/>
      <FormControl  sx={{ width: '500px' }}
    >
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
      </div>
      
     <div style={{display:'flex', justifyContent: 'center'}}>
       <div className='blogs'>
        {Array.isArray(blogData) ? ( blogData.map(blog => (
         <BlogCard
           key={blog._id} 
           title={blog.title}
           content={blog.content}
           author={blog.author}
           image={blog.image}
          //  category={blog.category}
          //  tags={blog.tags}
         />
       ))
      ) : (
        <p>No blog data available</p>
      )}
     </div></div> </div>
  )
}

export default Home