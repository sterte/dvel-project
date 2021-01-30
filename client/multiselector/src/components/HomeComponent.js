
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
                    emptyListMessage="Elenco ruoli vuoto"
                    />
                </div>
                <div className="col-4">
                    <MultiSelector 
                    type="director"
                    emptyListMessage="Eleno"
                    />
                </div>
                <div className="col-4">
                    <MultiSelector 
                    type="movie"
                    autocompleteKeywords="keywords"
                    />
                </div>
            </div>
        </div>
	);
}

export default Home;