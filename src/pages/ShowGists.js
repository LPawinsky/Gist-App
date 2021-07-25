import React from 'react';
import Wrapper from '../Wrapper';
import Gist from './Gist';
import '../css/ShowGists.css';
import { ReactPaginate } from 'react-paginate';

export default class ShowGists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: [],
            loading: true,
            data: [],
            filename: [],
            content: '',
            description: '',
            count: 0,
        }
        this.wrapper = new Wrapper()
    };
    async componentDidMount(){
        await this.wrapper.getIds().then(data => {
            data.forEach((id) => {
               this.wrapper.getGist(id).then(data => {
                    const newVal = this.state.data;
                    for(const value of Object.keys(data.data.files)){
                        newVal.push(value);
                        this.setState(prevState => ({
                            filename: [...prevState.filename, value]
                        }))
                        this.setState(prevState => ({
                            id: [...prevState.id, data.data.id]
                        }))
                        this.setState({ count: this.state.count+1 })
                    }
                    this.setState({ loading: false, data: newVal })
                    console.log(this.state)
                })
            })
        })
    };
    handleDelete = (gistId) => {
        this.wrapper.deleteGist(gistId).then(()=> {
            this.setState({
                id: this.state.id.filter(id => id !== gistId),
                count: this.state.count-1
            })
        })
    };
    render(){
        const count = this.state.count;
        return(
            <div className="container">
                <h3 className="counter">You have {count === 0 ? ('no') : (count)} {count === 1 ? ('gist') : ('gists')}!</h3>
                <ul className="gist-container">    
                    {this.state.loading || this.state.data === [] ? (<div>Loading...</div>) : (this.state.id.map(id => (
                        <Gist handleDelete={this.handleDelete} id={id}/>
                    )))}
                </ul>
            </div>
        )
    }
}