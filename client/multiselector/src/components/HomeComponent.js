
import React from 'react';
import Example from './AutoSuggestExample';

function Home(props) {
	return (
		<div className="container">
            <div className="row justify-content-md-center">
		        <div className="col-6">
                    <Example />
                </div>
                <div className="col-6">
                    <Example />
                </div>
            </div>
        </div>
	);
}

export default Home;