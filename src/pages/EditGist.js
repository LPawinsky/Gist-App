import React from 'react';
import Wrapper from '../Wrapper'

export default class EditGist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: this.props.location.state.id
        }
        this.wrapper = new Wrapper()
    }
    componentDidMount(props){
        console.log(this.state.id)
        this.wrapper.getGist(this.state.id).then(res => {
                for(const [key,value] of Object.entries(res.data.files)){
                    this.setState({
                        description: res.data.description,
                        filename: value.filename,
                        content: value.content
                    })
                    
               }
               console.log(this.state)
               console.log(res.data.files)
            }
        )
    }
    componentDidUpdate(){
        console.log(this.state)
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
        this.wrapper.editGist(this.state.id, this.makeJson()).then(res => {
            console.log(res);
        })
    }
    checkMouse = e => {
        console.log(e)
    }
    render(){
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
                            <textarea tabIndex="-1" onKeyDown={this.onKeyPressed} id="code" rows="5" cols="60" name="code" placeholder="Enter a code" defaultValue={this.state.content} onChange={this.handleCodeInput}></textarea>
                        </fieldset>
                        <button type="button" onMouseUp={this.checkMouse} onClick={this.onSubmit}>Submit!</button>
                    </form>
                </div>
            </div>
        )
    }
}