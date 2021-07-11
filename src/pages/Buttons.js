import React from 'react';
import CreateGist from './CreateGist.js';
import './css/Buttons.css';

export default class Buttons extends React.Component{
    constructor(props){
        super(props)
        this.childState = React.createRef();
        this.state = {
            clicked: '',
            hidden: 'hidden',
            visible: 'visible'
        }
    }

    componentDidUpdate() {
        console.log(this.state);
        console.log(this.props);
    }

    onCreateClick = () => {
        this.setState({ clicked: 'create' });
    }
    onEditClick = () => {
        this.setState({ clicked: 'edit' });
    }
    onDeleteClick = () => {
        this.setState({ clicked: 'delete' });
    }
    onShowClick = () => {
        this.setState({ clicked: 'show'});
    }


    render(){
        return(
            <section>
                <div className="container" align="center">
                        <button className="btn create-gist" onClick={this.onCreateClick}>Create gist</button>
                        <button className="btn edit-gist" onClick={this.onEditClick}>Edit gist</button>
                        <button className="btn delete-gist" onClick={this.onDeleteClick}>Delete gist</button>
                        <button className="btn show-gists" onClick={this.onShowClick}>Show gists</button>
                </div>
                <CreateGist></CreateGist>
            </section>
        )
    }
}