import React, { Component } from 'react';
import MyAutoSuggest from './MyAutoSuggest';

class SingleSelector extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <MyAutoSuggest
                            autocompleteKeywords="keywords"
                            autocompleteLabel="label"
                            autocompleteValue="value"
                            autocompleteURL="http://192.168.1.20:8080"
                            emptyListMessage="Elenco Ruoli vuoto"
                            entries={[{ "label": "Al Pacino", "value": 2000000 }, { "label": "Scarlett Johansson", "value": 2000001 }]}
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


export default SingleSelector;