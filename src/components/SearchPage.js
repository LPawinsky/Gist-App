import React from 'react';
import Wrapper from '../Wrapper';
import Gist from './Gist';
import SearchBar from './SearchBar';
import ReactPaginate from 'react-paginate'
import '../styles/SearchPage.css'

export default class SearchPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            defaultList: false,
            pagination: true,
            shownGists: [],
            setShownGists : [],
            count: 0,
            pageNumber: 0,
            setPageNumber: 0,
            gistsPerPage: 8,
            pagesVisited: 0
        }
        this.wrapper = new Wrapper()
    }
    async componentDidMount(){
        localStorage.setItem('token', '')
        await this.wrapper.getIds().then(id => {
            if(id.length === 0){
                this.setState({ loading: false })
            }
            else{
            id.map(id => {
                this.wrapper.getGist(id).then(gist => {
                    for(const [key,value] of Object.entries(gist.data.files)){
                        const newGist = {
                            filename: key.toString(),
                            content: value.content,
                            description: gist.data.description,
                            id: gist.data.id,
                            language: value.language
                        }
                        this.setState(prevState => ({
                            shownGists: [...prevState.shownGists, newGist],
                            setShownGists: [...prevState.setShownGists, newGist],
                            count: this.state.count+1
                        }))
                        console.log(this.state.shownGists)
                    }
                    this.setState({
                        loading: false,
                        pageNumber: 0,
                        setPageNumber: 0,
                        gistsPerPage: 8,
                        pagesVisited: this.state.pageNumber * this.state.gistsPerPage,
                        pageCount: Math.ceil(this.state.shownGists.length / this.state.gistsPerPage)
                    })
                })
                return id
            },() => {
                console.log('loaded!')
            })
        }
        })
    }
    handleDelete = gistId => {
        this.wrapper.deleteGist(gistId).then(()=> {
            this.setState({
                shownGists: this.state.setShownGists.filter(gist => gist.id !== gistId),
                setShownGists: this.state.setShownGists.filter(gist => gist.id !== gistId),
                count: this.state.count-1,
            })
        })
    };
    onChange = e => {
        
        const filteredFilename = this.state.shownGists.filter(gist => gist.filename.toLowerCase().includes(e.target.value.toLowerCase()))

        if(e.target.value !== ''){
            this.setState({ shownGists: filteredFilename })
        }
        if(e.target.value === ''){
            this.setState({ shownGists: this.state.setShownGists })
        }
        if(filteredFilename.length === 0){
            this.setState({ defaultList: true })
        }
        if(filteredFilename.length !== 0){
            this.setState({ defaultList: false })
        }
        if(e.target.value === "" && filteredFilename.length !== 0){
            this.setState({ defaultList: false })
        }
    }
    changePage = ({selected}) => {
        this.setState({ setPageNumber: selected})
    }
    render(){
        return(
            <div className="container">
                <SearchBar input={this.state.input} onInputChange={this.onChange} />
                <h3 className="counter">You have {this.state.count === 0 ? ('no') : (this.state.count)} {(this.state.count === 1 ? ('gist') : ('gists'))}</h3>
                <ul className="gist-container">
                    {
                    
                    this.state.defaultList ? (<div>Nothing to show!</div>) : (this.state.loading ? (<div>Loading...</div>) : (this.state.shownGists.length === 0 ? (<div>Nothing to show!</div>) : (
                        this.state.pagination ? ((this.state.shownGists.slice(this.state.pagesVisited, this.state.pagesVisited + this.state.gistsPerPage).map(gist => {
                            return <Gist handleDelete={this.handleDelete} key={gist.id} data={gist}/>
                        }))) : (<div>no pagination</div>)
                    )))}
                    
                    {/* (this.state.shownGists.map(gist => {
                        return <Gist handleDelete={this.handleDelete} key={gist.id} data={gist}/>
                    })) */}

                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={this.state.pageCount}
                        onPageChange={this.changePage}
                        containerClassName={'paginationBtn'}
                        previousLinkClassName={'previousBtn'}
                        nextLinkClassName={'nextBtn'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                    />
                </ul>
            </div>
        )
    }
}