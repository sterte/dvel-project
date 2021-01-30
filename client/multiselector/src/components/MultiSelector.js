import React, { Component } from 'react';
import MyAutoSuggest from './MyAutoSuggest';

class MultiSelector extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        return(
            <MyAutoSuggest 
            {... this.props}
            />
        );
    }
  }
  
  export default MultiSelector;