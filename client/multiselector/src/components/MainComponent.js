import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import SingleSelector from './SingleSelectorComponent';
import MultipleSelector from './MultipleSelectorComponent';
import Playground from './PlaygroundComponent';

class Main extends Component {

    render() {

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={() => <Home />} />
                    <Route path="/single" component={() => <SingleSelector />} />
                    <Route path="/multi" component={() => <MultipleSelector />} />
                    <Route path="/playground" component={() => <Playground />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);