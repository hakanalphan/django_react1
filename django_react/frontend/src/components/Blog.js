import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/blog/featured/');
                setFeaturedBlog(res.data[0]);
            }
            catch(err){

            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/blog/');
                setBlogs(res.data);
            }
            catch(err){

            }
        }
        fetchBlogs();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word) 
            return word.charAt(0).toUpperCase() + word.slice(1);
        return ''; 
    };
    const getBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-success">{capitalizeFirstLetter(blogPost.category)}</strong>
                    <h3 class="mb-0">{blogPost.title}</h3>
                    <div class="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
                    <p class="mb-auto">{blogPost.excerpt}</p>
                    <Link to={`/blog/${blogPost.slug}`} class="stretched-link">Okumaya Devam Et</Link>
                    </div>
                <div class="col-auto d-none d-lg-block">
                    <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' />
                </div>
              </div>
            );
        });


        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
        return result;
    };

    return (
        <div className="container">
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to='/category/dunya'>DÜNYA</Link>
                    <Link className="p-2 text-muted" to='/category/teknoloji'>TEKNOLOJİ</Link>
                    <Link className="p-2 text-muted" to='/category/saglik'>SAĞLIK</Link>
                    <Link className="p-2 text-muted" to='/category/politika'>POLİTİKA</Link>
                    <Link className="p-2 text-muted" to='/category/bilim'>BİLİM</Link>
                    <Link className="p-2 text-muted" to='/category/stil'>STİL</Link>
                    <Link className="p-2 text-muted" to='/category/kultur'>KÜLTÜR</Link>
                    <Link className="p-2 text-muted" to='/category/cevre'>ÇEVRE</Link>
                </nav>
            </div>
            <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                <div class="col-md-6 px-0">
                <h1 class="display-4 font-italic">{featuredBlog.title}</h1>
                <p class="lead my-3">{featuredBlog.excerpt}</p>
                <p class="lead mb-0">
                    <Link to={`/blog/${featuredBlog.slug}`}  class="text-white font-weight-bold">
                        Okumaya Devam Et ....
                    </Link>
                </p>
                </div>
            </div>
            {getBlogs()}
        </div>

    );

};

export default Blog;