import React from 'react';
import Wrapper from '../Wrapper'
import '../css/ShowGists.css';
import { Redirect } from 'react-router-dom';

export default class Gist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filename: '',
            description: '',
            redirect: false,
        }
    }
    gistData = async (id) => {
        let wrapper = new Wrapper();
        await wrapper.getGist(id).then(data => {
            for(const value of Object.keys(data.data.files)){
                this.setState({
                    filename: value,
                    description: data.data.description
                })
            }
        })
    }
    componentDidMount(){
        this.gistData(this.props.id)
    }
    async componentDidUpdate(){
        
    }
    deleteGist = () => {
        const id = this.props.id;
        this.props.handleDelete(id);
    }
    editGist = () => {
        this.setState({ redirect: true });
    }
    render(){
        if(this.state.redirect){
            console.log(this.props.id)
            return <Redirect 
                to={{
                    pathname: '/edit_gist',
                    state: { id: this.props.id }
                }}/>
        }
        return(
            <li className="list-item" key={this.props.id}> 
                <p className="filename">{this.state.filename}</p><br />
                <p className="description">{this.state.description}</p>
                <button className="btn" onClick={this.deleteGist}>Delete</button>
                <button className="btn"  onClick={this.editGist}>Edit</button>
            </li>
        )
    }
}