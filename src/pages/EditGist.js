import React from 'react';
import Wrapper from '../Wrapper'
import { Redirect } from 'react-router-dom';

export default class EditGist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            id: this.props.location.state.id
        }
        this.wrapper = new Wrapper()
    }
    componentDidMount(){
        this.wrapper.getGist(this.state.id).then(res => {
            this.setState({ description: res.data.description })
                for(const [key, value] of Object.entries(res.data.files)){
                    this.setState({
                        filename: key,
                        content: value.content
                    })
               }
            }
        )
    }
    handleDescription = (e) => {
        this.setState({ description: e.target.value });
    }
    handleFilename = (e) => {
        this.setState({ filename: e.target.value });
    }
    handleCodeInput = (e) => {
        this.setState({ content: e.target.value });
    }
    makeJson = () => {
        const json = {
            description: this.state.description,
            public: true,
            "files": {
                [this.state.filename]: {
                    content: this.state.content,
                }
            }
        };
        return JSON.stringify(json);
    }
    onSubmit = () => {
        this.wrapper.editGist(this.state.id, this.makeJson()).then(() => {
            this.setState({ redirect: true })
        })
    }
    render(){
        if(this.state.redirect === false){
            return(
                <div>
                    <h1>Edit <b>'{this.state.filename}'</b> gist!</h1>
                    <div className="form_container">
                        <form tabIndex="0" id="create_form">
                            <fieldset>
                                <div className="bace-inputs">
                                    <input type="text" placeholder="Enter a gist description" id="description" name="description" defaultValue={this.state.description} onChange={this.handleDescription} />
                                    <input readOnly="true" type="text" placeholder="Filename including extension" id="filename" name="filename" defaultValue={this.state.filename} onChange={this.handleFilename} />
                                </div>
                                <textarea tabIndex="-1" id="code" rows="5" cols="60" name="code" placeholder="Enter a code" defaultValue={this.state.content} onChange={this.handleCodeInput}></textarea>
                            </fieldset>
                            <button type="button" onClick={this.onSubmit}>Submit!</button>
                        </form>
                    </div>
                </div>
            )
        }
        if(this.state.redirect === true) {
            return <Redirect to='/' />
        }
    }
}