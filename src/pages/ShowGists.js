import React from 'react';
import Wrapper from '../Wrapper';
import '../css/ShowGists.css';

export default class ShowGists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: [],
            filename: [],
            content: '',
            description: '',
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
                    }
                    this.setState({ loading: false, data: newVal })
                    console.log(this.state.filename)
                })
            })
        })
    };
    render(){
        return(
            <div className="container">
                <ul>
                {this.state.loading || this.state.data === [] ? (
                <div>Loading...</div>
                ) : (this.state.filename.map((value, i) => <li  key={i}>{value}</li>))}
                </ul>
            </div>
        )
    }
}