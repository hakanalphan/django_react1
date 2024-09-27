import React from 'react';
import {Link} from 'react-router-dom';


const Home = () => (
    <div className="container mt-5">
        <div class="jumbotron">
            <h1 class="display-4">Merhaba Dünya! </h1>
            <p class="lead">Burası Özgenin yeri. Dikkatli Olun!</p>
            <hr class="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <Link class="btn btn-primary btn-lg" to="/blog" role="button">Daha fazlası için</Link>
        </div>
    </div>
);

export default Home;