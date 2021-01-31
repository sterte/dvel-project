import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { fetchItems } from '../redux/ActionCreators';
import { Card, CardTitle, Button, CardBody} from 'reactstrap';


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
  
  componentDidMount(){    
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

    if(!this.entries)
      return;
    if(this.entries.length>0){
      this.setState({selectedElements: this.state.selectedElements.concat(this.props.entries)})      
    }    
  }

  getSuggestionValue(suggestion) {
    return suggestion[this.autocompleteLabel];    
  }
  
  renderSuggestion(suggestion) {
    return (      
      <span>{suggestion[this.autocompleteLabel]}</span>
    );
  }
  
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
    

  onSuggestionSelected(event, { suggestion }){
    if(this.state.selectedElements.filter(el => el.value === suggestion.value).length === 0){      
      this.setState({selectedElements: this.state.selectedElements.concat(suggestion), previousValue: '', value: ''});      
    }
    else{
      alert("aaa");
    }
    this.setState({previousValue: '', value: ''});
  }

  removeSelectedItem(value){
    if(!value)
      return;        
    this.setState({selectedElements: this.state.selectedElements.filter((el) => el[this.autocompleteValue] !== value)});    
    if(this.state.selectedElements.length <= this.maxEntries + 1){
      console.log(this.state.selectedElements.length + " " + this.state.selectionExpanded + " " + this.maxEntries);
      this.setState({selectionExpanded: false});    
    }
  }

  selectedElementIds(){
    let result = "";    
    for (let i=0; i<this.state.selectedElements.length; i++){      
      if(result.length > 0)
        result += ", ";
      result += this.state.selectedElements[i][this.autocompleteValue];      
    }
    return result;
  }

  shouldRenderSuggestions(value, reason) {    
    return value.trim().length >= this.minQueryLength;
  }

  visibleSelectionSize() {    
    if(this.state.selectionExpanded || this.maxEntries === 0)
      return this.state.selectedElements.length;          
    return this.maxEntries;

  }

  onSuggestionsFetchRequested = ({ value }) => {            
    this.loadSuggestions(value, this.maxResults);
  };

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
    
    const RenderSelectedItem = ({item}) => {
      return(
        <div className="col-12">
        <Card>				      
        <CardBody>
        <div className="row">
        <div className="col-10">
        <CardTitle>{item.label}</CardTitle>
        </div>
        <div className="col-2">
        <Button color="danger" size="sm" onClick={() => this.removeSelectedItem(item[this.autocompleteValue])}>X</Button>
        </div>
        </div>
        </CardBody>
        </Card>
        </div>
        );
    }

    const selectedBoxes = this.state.selectedElements.slice(0, this.visibleSelectionSize()).map((item) => {      
      return (
        <div key={item.value} className="col-12 col-md-4 mb-2">
          <div className="row">
        <RenderSelectedItem item={item} />
        </div>
        </div>
        );
    });

    const totalSelectionCount = (maxEntries) => {      
      let count = this.state.selectedElements.length - maxEntries;
      return (        
        <div className="col-12 col-md-4">
        <div className="row">
        <div className="col-12">
        <Card>		
        <CardBody>
        <div className="row">
        <div className="col-10">
        <CardTitle>{count}</CardTitle>
        </div>
        <div className="col-2">
        <Button color="secondary" size="sm" onClick={() => this.setState({selectionExpanded: true})}>...</Button>     
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
        <h3>{this.state.selectedElements.length === 0 ? this.emptyListMessage : this.viewListMessage } ({this.state.selectedElements.length})</h3>
      </div>      
      <div className="row mb-3">
        {this.state.selectedElements.length > 0 && selectedBoxes }
        {this.state.selectedElements.length > this.maxEntries && !this.state.selectionExpanded && totalSelectionCount(this.maxEntries) }
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
          <input type="hidden" readOnly id={this.hiddenInputId} value={this.selectedElementIds()}/>
          { this.props.suggestions.isLoading &&
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