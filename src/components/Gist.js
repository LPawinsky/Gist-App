import React from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/Gist.css';

export default class Gist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filename: '',
            redirect: false,
        }
    }
    componentDidMount(){
        this.setState({ 
            filename: this.props.data.filename,
            description: this.props.data.description
        })
    }
    deleteGist = () => {
        const id = this.props.data.id;
        this.props.handleDelete(id);
    }
    editGist = () => {
        this.setState({ redirect: true });
    }
    render(){
        if(this.state.redirect){
            return <Redirect 
                to={{
                    pathname: '/edit_gist',
                    state: { id: this.props.data.id}
                }}/>
        }
        return(
            <li className="list-item" key={this.props.id}> 
                <div className="states">
                    <p className="filename">{this.state.filename}</p><br />
                    <p className="description">{this.state.description}</p>
                </div>
                <div className="btn-container">
                    <button className="btn del-btn" onClick={this.deleteGist}><img className="del-btn-icon" src="https://image.flaticon.com/icons/png/512/1214/1214428.png" alt="icon" /></button>
                    <button className="btn edit-btn"  onClick={this.editGist}><img className="edit-btn-icon" src="https://image.flaticon.com/icons/png/512/1159/1159633.png" alt="icon" /></button>
                </div>
            </li>
        )
    }
}