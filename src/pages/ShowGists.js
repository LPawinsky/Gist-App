import React, { useState } from 'react';
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
    };
    async componentDidMount(){
        let wrapper = new Wrapper();
        // pobranie wszystkich id
        await wrapper.getIds().then(data => {
            //pętla przez pobrane dane
            data.forEach((id,index) => {
                //pobranie gistow o danych id
               wrapper.getGist(id).then(data => {
                    // petla podająca wszystkie id
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
                    console.log(this.state.id)
                })
            })
        })
    };
    render(){
        return(
            <div className="container">
                <h3 className="counter">You have {this.state.count} gists!</h3>
                <ul>
                {this.state.loading || this.state.data === [] ? (<div>Loading...</div>) : (this.state.id.map(id => (
                    <Gist id={id}/>
                )))}
                </ul>
            </div>
        )
    }
}