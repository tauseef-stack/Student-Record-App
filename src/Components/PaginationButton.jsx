import './paginationButton.css';
import { Link } from 'react-router-dom';
export const PaginationButton = ({ pages,size,first10Data,city}) => {
    
    let arr = [...Array(pages).keys()]
    console.log(arr, pages)
    
    const pagination = (page, size,city) => {
       first10Data(page, size,city)
    }
    return (
        <div className='paginationButtonContainer'>
            <div className="buttonWrapper">
            {arr && arr.map((item, i) => {
                    return (
                    <div key={ i } className="paginationButton">
                     <button className="pages" onClick={() => {
                                pagination(i+1,size,city)
                            }}>{item + 1} </button>
                    </div>
                    )
                    
                })}
            </div>
            </div>
    )
}
