import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';


const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const slug = id;
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/blog/${slug}`);
                setBlog(res.data);
            }
            catch(err){

            }
        };
        fetchData();
    }, [id]);

    const createBlog = () => {
        return {__html: blog.content}
    }

    const capitalizeFirstLetter = (word) => {
        if (word) 
            return word.charAt(0).toUpperCase() + word.slice(1);
        return ''; 
    };



    return (

        <div className="container mt-3 ">
            <h1 className="display-2">
                {blog.title}
            </h1>
            <h2 className="text-muted  mt-3">
            Category: {capitalizeFirstLetter(blog.category)}
            </h2>
            <h4>
              M: {blog.month} - D: {blog.day}
            </h4>
            <div className ="mt-5 mb-5" dangerouslySetInnerHTML={createBlog()} />
            <hr/>
            <p className="lead mb-5"><Link to="/blog" className="font-weight-bold">Bloga Geri Dön</Link></p>
        </div>
    );  
    
};

export default BlogDetail;