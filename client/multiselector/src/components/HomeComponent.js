import React, { Component } from 'react';
import MultiSelector from './MultiSelector';

class Home extends Component {
  
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <MultiSelector 
                        autocompleteKeywords="keywords"                    
                        autocompleteLabel="label"
                        autocompleteValue="value"
                        autocompleteURL="http://localhost:8080"
                        emptyListMessage="Elenco Ruoli vuoto"
                        entries={[{"label": "Al Pacino", "value": 2000000}, {"label": "Scarlett Johansson", "value": 2000001}]}
                        hiddenInputId="multiSelectorHiddenInput"
                        maxEntries="3"
                        maxResults="10"
                        minQueryLength="2"
                        placeholder="Filtra nome ruolo"                        
                        title="Associa ruoli"
                        viewListMessage="Visualizza elenco ruoli"
                        type="actor"
                        />
                    </div>                
                </div>
            </div>
        );
    }
  }
  
  
export default Home;