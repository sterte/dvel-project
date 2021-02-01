import React, { Component } from 'react';
import MyAutoSuggest from './MyAutoSuggest';

class MultipleSelector extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-5">
                        <MyAutoSuggest
                            autocompleteKeywords="keywords"
                            autocompleteLabel="label"
                            autocompleteValue="value"
                            autocompleteURL="http://192.168.1.20:8080"
                            emptyListMessage="Elenco Ruoli vuoto"
                            entries={[{ "label": "Marcello Mastroianni", "value": 2000000 }, { "label": "Anna Karina", "value": 2000001 }]}
                            hiddenInputId="multiSelectorHiddenInput"
                            maxEntries="3"
                            maxResults="10"
                            minQueryLength="2"
                            placeholder="Filtra nome ruolo"
                            title="Associa ruoli"
                            viewListMessage="Visualizza elenco ruoli"
                            type="actor"
                        />
                        <hr />
                    </div>

                    <div className="col-12 mb-5">
                        <MyAutoSuggest
                            autocompleteKeywords="keywords"
                            autocompleteLabel="label"
                            autocompleteValue="value"
                            autocompleteURL="http://192.168.1.20:8080"
                            emptyListMessage="Elenco Ruoli vuoto"
                            entries={[{ "label": "Stanley Kubrick", "value": 2000002 }, { "label": "Martin Scorsese", "value": 2000003 }]}
                            hiddenInputId="multiSelectorHiddenInput"
                            maxEntries="3"
                            maxResults="10"
                            minQueryLength="2"
                            placeholder="Filtra nome ruolo"
                            title="Associa ruoli"
                            viewListMessage="Visualizza elenco ruoli"
                            type="director"
                        />
                        <hr />
                    </div>

                    <div className="col-12">
                        <MyAutoSuggest
                            autocompleteKeywords="keywords"
                            autocompleteLabel="label"
                            autocompleteValue="value"
                            autocompleteURL="http://192.168.1.20:8080"
                            emptyListMessage="Elenco Ruoli vuoto"
                            entries={[{ "label": "La corazzata Potemkin", "value": 2000004 }, { "label": "L'esorciccio", "value": 2000005 }]}
                            hiddenInputId="multiSelectorHiddenInput"
                            maxEntries="3"
                            maxResults="10"
                            minQueryLength="2"
                            placeholder="Filtra nome ruolo"
                            title="Associa ruoli"
                            viewListMessage="Visualizza elenco ruoli"
                            type="movie"
                        />
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}


export default MultipleSelector;