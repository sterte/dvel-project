
import React from 'react';
import MultiSelector from './MultiSelector';

function Home(props) {
	return (
		<div className="container">
            <div className="row justify-content-md-center">
		        <div className="col-4">
                    <MultiSelector 
                    type="actor"
                    autocompleteLabel="label"
                    autocompleteURL="http://localhost:8080"
                    emptyListMessage="Elenco Attori vuoto"
                    />
                </div>
                <div className="col-4">
                    <MultiSelector 
                    type="director"
                    autocompleteLabel="label"
                    autocompleteURL="http://localhost:8080"
                    emptyListMessage="Elenco registi vuoto"
                    />
                </div>
                <div className="col-4">
                    <MultiSelector 
                    type="movie"
                    autocompleteLabel="label"
                    autocompleteURL="http://localhost:8080"
                    emptyListMessage="Elenco film vuoto"
                    />
                </div>
            </div>
        </div>
	);
}

export default Home;