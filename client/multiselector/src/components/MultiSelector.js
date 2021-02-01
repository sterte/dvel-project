import React, { Component } from 'react';
import MyAutoSuggest from './MyAutoSuggest';
import { connect } from 'react-redux';
import { toggleHiddenInput } from '../redux/ActionCreators';


/* Redux */
const mapStateToProps = (state) => {
    return {
        showHiddenInput: state
    }
}

const mapDispatchToProps = (dispatch) => ({
    toggleHiddenInput: (value) => dispatch(toggleHiddenInput(value))
});

class MultiSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { showParams: false }
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.checked;
        if (target.name === "showParams") {
            this.setState({
                showParams: value
            });
        }
        else if (target.name === "showHiddenInput") {
            console.log(value);
            this.props.toggleHiddenInput(value);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10">
                        <MyAutoSuggest
                            {... this.props}
                        />
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="row">
                            <div className="col-12">
                                <form>
                                    <input name="showParams" type="checkbox" checked={this.state.showParams} onChange={this.handleInputChange} /> Parametri
                            </form>
                                <form>
                                    <input name="showHiddenInput" type="checkbox" onChange={this.handleInputChange} /> Input nascosto
                            </form>
                            </div>
                        </div>

                        {this.state.showParams &&

                            <div className="col-12 mt-5">
                                <ul>
                                    <li>autocompleteKeywords={this.props.autocompleteKeywords}</li>
                                    <li>autocompleteLabel={this.props.autocompleteLabel}</li>
                                    <li>autocompleteValue={this.props.autocompleteValue}</li>
                                    <li>autocompleteURL={this.props.autocompleteURL}</li>
                                    <li>emptyListMessage={this.props.emptyListMessage}</li>
                                    <li>entries={JSON.stringify(this.props.entries)}</li>
                                    <li>hiddenInputId={this.props.hiddenInputId}</li>
                                    <li>maxEntries={this.props.maxEntries}</li>
                                    <li>maxResults={this.props.maxResults}</li>
                                    <li>minQueryLength={this.props.minQueryLength}</li>
                                    <li>placeholder={this.props.placeholder}</li>
                                    <li>title={this.props.title}</li>
                                    <li>viewListMessage={this.props.viewListMessage}</li>
                                    <li>type={this.props.type}</li>
                                </ul>
                            </div>

                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelector);