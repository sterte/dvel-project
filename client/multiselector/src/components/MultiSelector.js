import React, { Component } from 'react';
import MyAutoSuggest from './MyAutoSuggest';

class MultiSelector extends Component {
  
    render() {
        return(
            <MyAutoSuggest 
            {... this.props}
            />
        );
    }
  }
  
  export default MultiSelector;