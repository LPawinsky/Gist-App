import React, { useState, useEffect } from 'react';
import Wrapper from '../Wrapper';
import Gist from './Gist';
import SearchBar from './SearchBar';
import ReactPaginate from 'react-paginate';
import '../styles/SearchPage.css';

export default function SearchPage(){
    const gistArray = [];
    const [defaultList, setDefaultList] = useState([]);
    const [shownGists, setShownGists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    
    const gistsPerPage = 8;
    const pagesVisited = pageNumber * gistsPerPage;
    const pageCount = Math.ceil(shownGists.length / gistsPerPage);

    const wrapper = new Wrapper();

    useEffect(async () => {
        await wrapper.getIds().then(id => {
            if(id.length === 0){
                setIsLoading(false);
            }
            else {
            id.map(gistId => {
                wrapper.getGist(gistId).then(gist => {
                    for(const [key,value] of Object.entries(gist.data.files)){
                        console.log(key)
                        const newGist = {
                            filename: key.toString(),
                            content: value.content,
                            description: gist.data.description,
                            id: gist.data.id,
                            language: value.language
                        }
                        gistArray.push(newGist) 
                    }
                    if(id.length===gistArray.length){
                        setIsLoading(false)
                        setCount(gistArray.length)
                    }
                    setShownGists(gistArray)
                    setDefaultList(gistArray)
                })
                return gistId
            })
        }})
    }, [])

    const handleDelete = (gistId) => {
        wrapper.deleteGist(gistId).then((res)=> {
            setShownGists(shownGists.filter(gist => gist.id !== gistId));
            setCount(count - 1)
        })
    };
    const onChange = e => {
        
        const filteredFilename = shownGists.filter(gist => gist.filename.toLowerCase().includes(e.target.value.toLowerCase()))
        setPageNumber(0)

        if(e.target.value !== ''){
            setShownGists(filteredFilename)
        }
        if(e.target.value === ''){
            setShownGists(defaultList)
        }
        if(shownGists.length === 0){
            console.log("absolute zero")
        }
    }
    const changePage = ({selected}) => {
        console.log("selected  " + selected)
        console.log("pagenumber " + pageNumber)
        console.log(pageCount)
        if(shownGists.length % 8 === 0 && pageCount === shownGists.length / 8){
            setPageNumber(0)
        }
        setPageNumber(selected)
    }
    const displayGists = shownGists.slice(pagesVisited, pagesVisited + gistsPerPage).map(gist => {
        return <Gist handleDelete={handleDelete} data={gist} key={gist.id} />
    })
    return(
        <div>
            {isLoading ? <div>Loading...</div> : (
            <div className="container">
                <SearchBar onInputChange={onChange} />
                <h3 className="counter">You have {count === 0 ? ('no') : (count)} {(count === 1 ? ('gist') : ('gists'))}</h3>
                <ul className="gist-container">
                    {shownGists.length === 0 ? <div className="no-gists">No gists you have, my master</div> : (displayGists)}
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination-btns"}
                    previousLinkClassName={"previous-btn"}
                    nextLinkClassName={"next-btn"}
                    disabledClassName={"pagination-disabled"}
                    activeClassName={"pagination-active"}
                />
                </ul>
                
            </div>
            )}
        </div>
    )
}
