import React from 'react';
import Wrapper from '../Wrapper';
import Gist from './Gist';
import '../css/ShowGists.css';

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
            isShown: 'hidden',
            setIsShown: false,
            count: 0,
        }
        this.wrapper = new Wrapper()
    };
    async componentDidMount(){
        await this.wrapper.getIds().then(data => {
            data.forEach((id,index) => {
               this.wrapper.getGist(id).then(data => {
                    const newVal = this.state.data;
                    for(const [key, value] of Object.entries(data.data.files)){
                        newVal.push(value);
                        this.setState(prevState => ({
                            filename: [...prevState.filename, value.filename]
                        }))
                        this.setState(prevState => ({
                            id: [...prevState.id, data.data.id]
                        }))
                        this.setState({ count: this.state.count+1 })
                    }
                    this.setState({ loading: false, data: newVal })
                    console.log(this.state.data)
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
        return(
            <div className="container">
                <h3 className="counter">You have {this.state.count} gists!</h3>
                <ul>
                {this.state.loading || this.state.data === [] ? (<div>Loading...</div>) : (this.state.id.map(id => (
                    <Gist handleDelete={this.handleDelete} id={id}/>
                )))}
                </ul>
            </div>
        )
    }
}