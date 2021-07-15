import React from 'react';
import GitHubWrapper from '../Wrapper';
import '../css/CreateGist.css'

export default class CreateGist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            description: '',
            public: true,
            filename: '',
            content: ''
        }
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
    makeJson(){
        const json = {
            description: this.state.description,
            public: this.state.public,
            "files": {
                [this.state.filename]: {
                    content: this.state.content,
                }
            }
        };
        return JSON.stringify(json);
    }
    onSubmit = () => {
        let wrapper = new GitHubWrapper();
        wrapper.createGist(this.makeJson()).then(res => {console.log(res)})
    }
    render(){
        return(
            <div>
                <h1>Create a gist!</h1>
                <div className="form_container">
                    <form id="create_form">
                        <fieldset>
                            <div className="bace-inputs">
                                <input type="text" placeholder="Enter a gist description" id="description" name="description" defaultValue={this.state.description} onChange={this.handleDescription} />
                                <input type="text" placeholder="Filename including extension" id="filename" name="filename" defaultValue={this.state.filename} onChange={this.handleFilename} />
                            </div>
                            <textarea id="code" rows="5" cols="60" name="code" placeholder="Enter a code" defaultValue={this.state.content} onChange={this.handleCodeInput}></textarea>
                        </fieldset>
                        <button type="button" onClick={this.onSubmit}>Submit!</button>
                    </form>
                </div>
            </div>
        )
    }
}
