import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
function BlogPage() {
    const [data, setData] = useState({})
    const { id } = useParams();
    useEffect( () =>{
        const getData = async() => {
            const data1 = await axios.get(`http://localhost:5000/blog/getBlog/${id}`)
            setData(data1)
        }
        getData()
        console.log(data," hello world")

    },[])
    console.log(id, " hello", data)
  return (
    <>
    { data.data &&   (<div>
      <h1>{data.data.title}</h1>
      <h4>{data.data.author}</h4>
    <img src={data.data.image} alt="Girl in a jacket" width="350" height="300"/>
    <h5>{data.data.content}</h5>

    </div>)}
    </>
  )
}

export default BlogPage