import React from 'react';

export default class SearchBar extends React.Component{
    render(){
        return(
            <input onChange={this.props.onInputChange} type="text" placeholder="Search"/>
        )
    }
}