import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ButtonAppBar from './AppBar'
import BlogCard from './BlogCard.js'
import './home.css'
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    fetchBlogData();
  }, []);

  const navigate = useNavigate()

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blog/getBlogs')
      setBlogData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };
  
  console.log(blogData)
  return (
    <div>
      <ButtonAppBar/>
     
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
     </div> </div>
  )
}

export default Home