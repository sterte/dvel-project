import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { fetchItems } from '../redux/ActionCreators';



const mapStateToProps = (state) => {
  return {
    suggestions: state
  }
}

const mapDispatchToProps = (dispatch) => ({  
  fetchItems: (type, value) => dispatch(fetchItems(type, value))
});




/* --------------- */
/*    Component    */
/* --------------- */


class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      previousValue: '',
      selectedElements: []       
    };

    this.renderSuggestion = this.renderSuggestion.bind(this);
  }


  getSuggestionValue(suggestion) {
    let fieldName = this.props.autocompleteLabel ? this.props.autocompleteLabel : "label";
    return suggestion[fieldName];
  }
  
  renderSuggestion(suggestion) {
    let fieldName = this.props.autocompleteLabel ? this.props.autocompleteLabel : "label";
    return (      
      <span>{suggestion[fieldName]}</span>
    );
  }
  
  loadSuggestions(value) {
    let url = this.props.autocompleteURL ? this.props.autocompleteURL : "";
    let keywords = this.props.autocompleteKeywords ? this.props.autocompleteKeywords : "keywords";
    let request = url + "/" + keywords + "/" + this.props.type + "/" + value;
    this.props.fetchItems(request);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      previousValue: this.state.value,
      value: newValue
    });
  };
    
  onSuggestionsFetchRequested = ({ value }) => {    
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
      this.props.suggestions.suggestions = [];    
  };

  render() {
    const { value } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };
    const status = (this.props.suggestions.isLoading ? 'Loading...' : 'Type to load suggestions');
    
    return (
      <>
      <div className="row">
        {this.state.selectedElements.length == 0 && this.props.emptyListMessage }
      </div>
      <div className="row">
        <div>
          <div className="status">
            <strong>Status:</strong> {status}
          </div>
          <Autosuggest 
            suggestions={this.props.suggestions.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
        </div>
      </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);