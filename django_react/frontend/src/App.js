import React from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import Category from './components/Category';
import BlogDetail from './components/BlogDetail';


const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route exact path="/" index element={<Home />} />
                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/category/:id" element={<Category />} />
                <Route exact path="/blog/:id" element={<BlogDetail />} />
            </Routes>
        </Layout>
    </Router>
);

export default App;