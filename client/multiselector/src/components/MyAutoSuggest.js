import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { fetchItems } from '../redux/ActionCreators';
import { Card, CardTitle, Button} from 'reactstrap';


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


class MyAutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      previousValue: '',
      selectedElements: []       
    };

    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
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
    

  onSuggestionSelected(event, { suggestion }){
    if(!this.state.selectedElements.includes(suggestion)){      
      this.setState({selectedElements: this.state.selectedElements.concat(suggestion), previousValue: '', value: ''});
    }    
  }

  removeSelectedItem(value){
    if(!value)
      return;
    let fieldName = this.props.autocompleteValue ? this.props.autocompleteValue : "value";
    this.setState({selectedElements: this.state.selectedElements.filter((el) => el[fieldName] != value)});
  }

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
      onChange: this.onChange,
    };
    const status = (this.props.suggestions.isLoading ? 'Loading...' : 'Type to load suggestions');
    
    const RenderSelectedItem = ({item}) => {
      let fieldName = this.props.autocompleteValue ? this.props.autocompleteValue : "value";
      return(
        <Card>				      
        <CardTitle>{item.label}</CardTitle>
        <Button onClick={() => this.removeSelectedItem(item[fieldName])}>X</Button>
        </Card>
        );
    }

    const selectedBoxes = this.state.selectedElements.map((item) => {
      return (
        <div key={item.value} className="col-12 col-md-5 m-1">
        <RenderSelectedItem item={item} />
        </div>
        );
    });
  


    return (
      <>
      <div className="row">
        {this.state.selectedElements.length === 0 ? this.props.emptyListMessage : selectedBoxes }
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
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
        </div>
      </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAutoSuggest);