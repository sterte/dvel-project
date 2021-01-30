import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { fetchItems } from '../redux/ActionCreators';



const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions
  }
}

const mapDispatchToProps = (dispatch) => ({  
  fetchItems: (type, value) => dispatch(fetchItems(type, value))
});




/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.label}</span>
  );
}

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      previousValue: ''
    };
  }


  
  loadSuggestions(value) {
    this.props.fetchItems(this.props.type, value);
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
    this.setState({
      suggestions: []
    });
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
      <div>
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
        <Autosuggest 
          suggestions={this.props.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);