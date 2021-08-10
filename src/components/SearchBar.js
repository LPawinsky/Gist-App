import React from 'react';
import '../styles/SearchBar.css'

export default class SearchBar extends React.Component{
    state = {
        placeholder: 'Search'
    }
    onFocus = () => {
        this.setState({ placeholder: 'Search More'})
    }
    onBlur = () => {
        this.setState({ placeholder: "Search" })
    }
    render(){
        return(
            <input onFocus={this.onFocus} onBlur={this.onBlur} className="search-bar" onChange={this.props.onInputChange} type="text" placeholder={this.state.placeholder}/>
        )
    }
}