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
  }
  
  componentDidMount(){
    if(!this.props.entries)
      return;
    if(this.props.entries.length>0){
      this.setState({selectedElements: this.state.selectedElements.concat(this.props.entries)})      
    }    
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
  
  loadSuggestions(value, maxResults) {
    let url = this.props.autocompleteURL ? this.props.autocompleteURL : "";
    let keywords = this.props.autocompleteKeywords ? this.props.autocompleteKeywords : "keywords";
    let request = url + "/" + keywords + "/" + this.props.type + "/" + value;
    this.props.fetchItems(request, maxResults);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      previousValue: this.state.value,
      value: newValue
    });
  };
    

  onSuggestionSelected(event, { suggestion }){
    console.log(this.state.selectedElements)
    if(!this.state.selectedElements.includes(suggestion)){      
      this.setState({selectedElements: this.state.selectedElements.concat(suggestion), previousValue: '', value: ''});
    }    
  }

  removeSelectedItem(value){
    if(!value)
      return;
    let fieldName = this.props.autocompleteValue ? this.props.autocompleteValue : "value";
    this.setState({selectedElements: this.state.selectedElements.filter((el) => el[fieldName] !== value)});    
  }

  selectedElementIds(){
    let fieldName = this.props.autocompleteValue ? this.props.autocompleteValue : "value";
    let result = "";    
    for (let i=0; i<this.state.selectedElements.length; i++){      
      if(result.length > 0)
        result += ", ";
      result += this.state.selectedElements[i][fieldName];      
    }
    return result;
  }

  visibleSelectionSize() {
    let maxEntries = this.props.maxEntries ? this.props.maxEntries : 0;
    if(this.state.selectionExpanded || maxEntries == 0)
      return this.state.selectedElements.length;          
    return maxEntries;

  }

  onSuggestionsFetchRequested = ({ value }) => {        
    let maxResults = this.props.maxResults ? this.props.maxResults : 10;
    this.loadSuggestions(value, maxResults);
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

    const selectedBoxes = this.state.selectedElements.slice(0, this.visibleSelectionSize()).map((item) => {
      return (
        <div key={item.value} className="col-12 col-md-5 m-1">
        <RenderSelectedItem item={item} />
        </div>
        );
    });

    let hiddenInputfieldName = this.props.hiddenInputId ? this.props.hiddenInputId : "'multiSelectorHiddenInput'";
    let maxEntries = this.props.maxEntries ? this.props.maxEntries : 0;

    return (
      <>
      <div className="row">
        {this.state.selectedElements.length === 0 ? this.props.emptyListMessage : selectedBoxes }
        {this.state.selectedElements.length > maxEntries && <Button onClick={() => this.setState({selectionExpanded: true})}>X</Button> }
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
          <input type="hidden" readOnly id={hiddenInputfieldName} value={this.selectedElementIds()}/>
        </div>
      </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAutoSuggest);