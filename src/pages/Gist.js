import React from 'react';
import Wrapper from '../Wrapper'

export default class Gist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filename: ''
        }
    }
    gistData = async () => {
        let wrapper = new Wrapper();
        await wrapper.getGist(this.props.id).then(res => {
            for(const [key,value] of Object.entries(res.data.files)){
                this.setState({filename: value.filename})
            }
        })
        console.log(this.state.filename)
    }
    componentDidMount(){
        this.gistData()
    }
    async componentDidUpdate(){
        
    }
    deleteGist = () => {
        let wrapper = new Wrapper();
        wrapper.deleteGist(this.props.id).then(res => {
            console.log(res)
        })
    }
    render(){
        
        return(
            <li> 
                {this.state.filename}
                <button onClick={this.deleteGist}>Delete</button>
            </li>
        )
    }
}