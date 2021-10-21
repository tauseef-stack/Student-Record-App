import { LeftBottom } from '../../Components/LeftBottom';
import { Right } from '../../Components/Right';
import {PaginationButton} from '../../Components/PaginationButton';
import { useState, useEffect } from 'react';

import '../Home/home.css';
import axios from 'axios';
export const Ascending = () => {
    const [first10, setfirst10] = useState([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const first10Data = async (page, size) => {
        setPage(page);
        setSize(size);
       await axios.get(`http://localhost:5555/student/age/sort/ascending?page=${page}&size=${size}`).then((res) => {
            const data = res.data
            const pages = Number(data.noPages);
            const mydata = data.students;
            console.log(mydata,pages);
            setfirst10(mydata);
            setPages(pages)
        }).catch((err) => {
             console.log(err);
         })
    }

    
    return (
        <div className='homeContainer'>
        <PaginationButton pages={pages} page={page} size={size}first10Data={first10Data}/>
        <div className="homeWrapper">

            <Right first10={first10} pages={pages} />
       
            <LeftBottom first10Data={first10Data}/>
       </div>
    </div>
    )
}
