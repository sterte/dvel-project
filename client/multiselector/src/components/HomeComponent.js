
import React from 'react';
import Example from './AutoSuggestExample';

function Home(props) {
	return (
		<div className="container">
            <div className="row justify-content-md-center">
		        <div className="col-4">
                    <Example 
                    type="actor"
                    autocompleteLabel="label"
                    />
                </div>
                <div className="col-4">
                    <Example 
                    type="director"
                    />
                </div>
                <div className="col-4">
                    <Example 
                    type="movie"
                    autocompleteKeywords="keywords"
                    />
                </div>
            </div>
        </div>
	);
}

export default Home;