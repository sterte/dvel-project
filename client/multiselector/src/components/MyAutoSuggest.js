import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { fetchItems } from '../redux/ActionCreators';
import { Card, CardTitle, Button, CardBody } from 'reactstrap';



/* Redux */
const mapStateToProps = (state) => {
    return {
        suggestions: state
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchItems: (request, maxResults) => dispatch(fetchItems(request, maxResults))
});




/* --------------- */
/*    Component    */
/* --------------- */


class MyAutoSuggest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            previousValue: '',
            selectionExpanded: false,
            selectedElements: []
        };

        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    }

    componentDidMount() {
        //sets up props setting default values for missing and parsing integer values
        this.autocompleteKeywords = this.props.autocompleteKeywords ? this.props.autocompleteKeywords : "keywords";
        this.autocompleteLabel = this.props.autocompleteLabel ? this.props.autocompleteLabel : "label";
        this.autocompleteURL = this.props.autocompleteURL ? this.props.autocompleteURL : "";
        this.autocompleteValue = this.props.autocompleteLabel ? this.props.autocompleteValue : "value";
        this.emptyListMessage = this.props.emptyListMessage ? this.props.emptyListMessage : "";
        this.entries = this.props.entries ? this.props.entries : [];
        this.hiddenInputId = this.props.hiddenInputId ? this.props.hiddenInputId : "multiSelectorHiddenInput";
        this.maxEntries = this.props.maxEntries ? parseInt(this.props.maxEntries) : 0;
        this.maxResults = this.props.maxResults ? parseInt(this.props.maxResults) : 10;
        this.minQueryLength = this.props.minQueryLength ? parseInt(this.props.minQueryLength) : 3;
        this.placeholder = this.props.placeholder ? this.props.placeholder : "";
        this.title = this.props.title ? this.props.title : "";
        this.viewListMessage = this.props.viewListMessage ? this.props.viewListMessage : "";

        if (!this.entries)
            return;
        if (this.entries.length > 0) {
            this.setState({ selectedElements: this.state.selectedElements.concat(this.props.entries) })
        }
    }

    /* From original doc:
    Implement it to teach Autosuggest what should be the input value when suggestion is clicked.
    */
    getSuggestionValue(suggestion) {
        return suggestion[this.autocompleteLabel];
    }

    /* From original doc:
    Use your imagination to define how suggestions are rendered.
    */
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion[this.autocompleteLabel]}</span>
        );
    }

    /* Invokes rest api for suggestion loading
    */
    loadSuggestions(value, maxResults) {
        let request = this.autocompleteURL + "/" + this.autocompleteKeywords + "/" + this.props.type + "/" + value;
        this.props.fetchItems(request, maxResults);
    }


    onChange = (event, { newValue }) => {
        this.setState({
            previousValue: this.state.value,
            value: newValue
        });
    };

    /* From original doc:
    Will be called every time suggestion is selected via mouse or keyboard.
    */
    onSuggestionSelected(event, { suggestion }) {
        //checks if selected element is already been selected before
        if (this.state.selectedElements.filter(el => el.value === suggestion.value).length === 0) {
            this.setState({ selectedElements: this.state.selectedElements.concat(suggestion), previousValue: '', value: '' });
        }
        else {
            alert("Elemento già inserito. Non è possibile inserire elementi duplicati.");
        }
        //resets search text field after selection
        this.setState({ previousValue: '', value: '' });
    }

    /* Triggered when an element is removed (trash icon in a box is pressed)
    */
    removeSelectedItem(value) {
        if (!value)
            return;
        //remove the elements from the selected element
        this.setState({ selectedElements: this.state.selectedElements.filter((el) => el[this.autocompleteValue] !== value) });
        //if selected elements cardinality falls below maxEntries, expandedSelection is resetted (in order to became expandable again if new elements are added)
        if (this.state.selectedElements.length <= this.maxEntries + 1) {
            this.setState({ selectionExpanded: false });
        }
    }

    /* Creates a string of comma separated values of selected elements (for hiddenInputId)
    */
    selectedElementIds() {
        let result = "";
        for (let i = 0; i < this.state.selectedElements.length; i++) {
            if (result.length > 0)
                result += ", ";
            result += this.state.selectedElements[i][this.autocompleteValue];
        }
        return result;
    }

    /* From original doc.
    When the input is focused, Autosuggest will consult this function when to render suggestions.
    Use it, for example, if you want to display suggestions when input value is at least 2 characters long.
    */
    shouldRenderSuggestions(value, reason) {
        return value.trim().length >= this.minQueryLength;
    }

    /* Evaluates number of selected elements to be shown
    */
    visibleSelectionSize() {
        //if selection expanded or selected elements less than maxEntries, shows them all
        if (this.state.selectionExpanded || this.maxEntries === 0)
            return this.state.selectedElements.length;
        //otherwise shows the first "maxEntries"
        return this.maxEntries;

    }

    /* From original doc.
    Will be called every time you need to recalculate suggestions.
    */
    onSuggestionsFetchRequested = ({ value }) => {
        this.loadSuggestions(value, this.maxResults);
    };

    /* From original doc.
    Will be called every time you need to set suggestions to [].
    */
    onSuggestionsClearRequested = () => {
        this.props.suggestions.suggestions = [];
    };


    render() {

        const { value } = this.state;
        const inputProps = {
            placeholder: this.placeholder,
            value,
            onChange: this.onChange,
        };
        const status = (this.props.suggestions.isLoading && value.length >= this.minQueryLength ? 'Caricamento...' : '');

        //renders a single card for a single selected element
        const RenderSelectedItem = ({ item }) => {
            return (
                <div className="col-12">
                    <Card>
                        <CardBody>
                            <div className="row">
                                <div className="d-flex align-items-center col-10">
                                    <CardTitle>{item.label}</CardTitle>
                                </div>
                                <div className="col-2">
                                    <Button color="primary" onClick={() => this.removeSelectedItem(item[this.autocompleteValue])}><span className="fa fa-trash fa-lg" /></Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            );
        }

        //renders the cards for the selected elements
        const selectedBoxes = this.state.selectedElements.slice(0, this.visibleSelectionSize()).map((item) => {
            return (
                <div key={item.value} className="col-12 col-md-4 mb-2">
                    <div className="row">
                        <RenderSelectedItem item={item} />
                    </div>
                </div>
            );
        });

        //renders the card with elements count and expand button
        const totalSelectionCount = (maxEntries) => {
            let count = this.state.selectedElements.length - maxEntries;
            return (
                <div className="col-12 col-md-4">
                    <div className="row">
                        <div className="col-12">
                            <Card>
                                <CardBody>
                                    <div className="row">
                                        <div className="d-flex align-items-center col-10">
                                            <CardTitle>Altri {count}</CardTitle>
                                        </div>
                                        <div className="col-2">
                                            <Button color="primary" f onClick={() => this.setState({ selectionExpanded: true })}><span className="fa fa-ellipsis-h fa-lg" /></Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        };


        return (
            <>
                <div className="row mb-2">
                    <h3>{this.state.selectedElements.length === 0 ? this.emptyListMessage : this.viewListMessage} ({this.state.selectedElements.length})</h3>
                </div>
                <div className="row mb-3">
                    {this.state.selectedElements.length > 0 && selectedBoxes}
                    {this.state.selectedElements.length > this.maxEntries && !this.state.selectionExpanded && totalSelectionCount(this.maxEntries)}
                </div>
                {this.title &&
                    <div className="row mb-2">
                        <h3>{this.title}</h3>
                    </div>
                }
                <div className="row">
                    <div>
                        <Autosuggest
                            suggestions={this.props.suggestions.suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            shouldRenderSuggestions={this.shouldRenderSuggestions}
                            inputProps={inputProps} />
                        <input type="hidden" readOnly id={this.hiddenInputId} value={this.selectedElementIds()} />
                        {this.props.suggestions.isLoading &&
                            <div className="status">
                                {status}
                            </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAutoSuggest);