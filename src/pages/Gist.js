import React from 'react';
import Wrapper from '../Wrapper'
import EditGist from './EditGist'
import '../css/Gist.css';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class Gist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filename: '',
            description: '',
            isShown: 'btn',
            redirect: false,
        }
    }
    gistData = async (id) => {
        let wrapper = new Wrapper();
        await wrapper.getGist(id).then(res => {
            for(const [key,value] of Object.entries(res.data.files)){
                this.setState({
                    filename: value.filename,
                    description: res.data.description
                })
            }
        })
        console.log(this.state)
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
            <li className="list-item" onMouseOver={this.handleHover} onMouseLeave={this.handleMouseLeave} key={this.props.id}> 
                {this.state.filename}<br />
                {this.state.description}
                <button className={this.state.isShown} onClick={this.deleteGist}>Delete</button>
                <button className={this.state.isShown}  onClick={this.editGist}>Edit</button>
            </li>
        )
    }
}