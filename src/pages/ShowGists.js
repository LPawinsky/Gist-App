import React from 'react';
import Wrapper from '../Wrapper';
import '../css/ShowGists.css';

export default class ShowGists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: "",
        }
    }
    componentDidMount(){
        const gists = [];
        const wrapper = new Wrapper();
        wrapper.getRequest("/gists").then(result => {
            this.setState({ data: result.data }).bind(this)
            console.log(this.state)
        })
        const data = this.state.data;
        console.log(data)
    }
    render(){
        const data = this.state.data;
        return(
            <div className="container">
                <ul>
                    {data.map(el => {
                        <li>
                            {el}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}