import { LeftBottom } from '../../Components/LeftBottom';
import { Right } from '../../Components/Right';
import {PaginationButton} from '../../Components/PaginationButton';
import { useState, useEffect,useRef } from 'react';
import './home.css';
import axios from 'axios';
export const Home = () => {
    const [first10, setfirst10] = useState([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [home, setHome] = useState(true);
    const [asend, setAsend] = useState(false);
    const [desend, setDesend] = useState(false)
    const [cityF, setCityF] = useState(false);
    const [city, setCity] = useState("");
    const myCity = useRef(null)
    const myGender = useRef(null)
    const [genderF, setGenderF] = useState(false);
    const [gender, setGender] = useState("");
    const [modal,setModal] = useState(false)
    const [myId, setMyId] = useState("");

    useEffect(() => {
        first10Data();
    }, [])

    const first10Data = async (page, size) => {
        setPage(page);
        setSize(size);
       await axios.get(`http://localhost:5555/student?page=${page}&size=${size}`).then((res) => {
            const data = res.data
            const pages = Number(data.noPages);
            const mydata = data.students;
           // console.log(mydata);
            setfirst10(mydata);
            setPages(pages)
        }).catch((err) => {
             console.log(err);
         })
    }
    
    const handleHome = () => {
        first10Data();
        setHome(true);
        setDesend(false);
        setAsend(false);
        setCityF(false);
        setGenderF(false);
        setPage(1);
    }

    const Asend = async(page,size)=>   {
        setPage(page);
        setSize(size);
       await axios.get(`http://localhost:5555/student/age/sort/ascending?page=${page}&size=${size}`).then((res) => {
           const data = res.data
           const pages = Number(data.noPages);
           const mydata = data.students;
           console.log(mydata, pages);
           setfirst10(mydata);
           setPages(pages);

       }).catch((err) => {
           console.log(err)
       })
   }
    const handleAscend = () => {
        setHome(false);
        setDesend(false);
        setAsend(true);
        setCityF(false);
        setGenderF(false);
        Asend()
        setPage(1)
    }

    const Desend = async (page,size) => {
        setPage(page);
        setSize(size);
       await axios.get(`http://localhost:5555/student/age/sort/decending?page=${page}&size=${size}`).then((res) => {
            const data = res.data
            const pages = Number(data.noPages);
            const mydata = data.students;
            console.log(mydata, pages);
            setfirst10(mydata);
            setPages(pages);
 
        }).catch((err) => {
            console.log(err)
        })
        // Desend();
        
    }
    const handleDesend = () => {
        setHome(false);
        setDesend(true);
        setAsend(false);
        setCityF(false);
        setGenderF(false);
        Desend();
        setPage(1);
    }

    const handleFlterByCity = () => {
        setCity(myCity.current.value)
      
        
       // console.log(city)
        setHome(false);
        setDesend(false);
        setAsend(false);
        setGenderF(false);
        setCityF(true)
        City(1, 10, myCity.current.value);
        myCity.current.value = null
        setPage(1);
        //setCity(null)
    }
    
    const City = async (page=1,size=10,city) => {
        setPage(page);
        setSize(size);
        console.log(page,size,city)
       await axios.get(`http://localhost:5555/student/city?city=${city}&page=${page}&size=${size}`).then((res) => {
            const data = res.data
            const pages = Number(data.noPages);
            const mydata = data.students;
            console.log(mydata, pages);
            setfirst10(mydata);
            setPages(pages);
 
        }).catch((err) => {
            console.log(err)
        }) 
    }

    const handleFilterByGender = () => {
        setGender(myGender.current.value)
      
        
         console.log(gender)
         setHome(false);
         setDesend(false);
         setAsend(false);
        setCityF(false);
        setGenderF(true);
         Gender(1, 10, myGender.current.value);
         myGender.current.value = null
         setPage(1);
    }

    const Gender = async (page=1,size=10,gender) => {
        setPage(page);
        setSize(size);
        console.log(page,size,gender)
       await axios.get(`http://localhost:5555/student/gender?gender=${gender}&page=${page}&size=${size}`).then((res) => {
            const data = res.data
            const pages = Number(data.noPages);
            const mydata = data.students;
            console.log(mydata, pages);
            setfirst10(mydata);
            setPages(pages);
 
        }).catch((err) => {
            console.log(err)
        }) 
    }

    const mydata = (data) => {
       
        //console.log(data)
       // console.log(myId,data)
        Update(myId,data)
        setMyId("")
    }

    const handleUpdate = (id) => {
        setModal(true);
        setMyId(id)

    }
    const Update = async (id,mydata) => {
        await axios.patch(`http://localhost:5555/student/${id}/update`, mydata).then((res) => {
            if (res.status === 201) {
                alert("Data Updated Successfully")
                console.log(res.data)
                first10Data();
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5555/student/${id}/delete`).then((res) => {
            const data = res.data;
            console.log(data);
          //  home ? first10Data() : asend ? Asend() : desend ? Desend() : null
            if (home) first10Data()
            else if (asend) Asend()
            else if (desend) Desend()
            else if (cityF) City(1, 10, city);
            else if (genderF) Gender(1,10,gender)
         
        }).catch((err) => {
            console.log(err)
        })

    }






 
    
  
    return modal ? (
        <div className="modalContainer">
            <LeftBottom modal={modal} mydata={ mydata }/>
            <button className="filterButton" onClick={()=>setModal(false)}>Close</button>    
        </div>
    ) : (
        <div className='homeContainer'>
                <div className="TopContainer">
                <div className='filterContainer'>
            <div className="filterWrapper">

             <button className="filterButton" onClick={handleHome}
                >Home</button>

               <button className="filterButton" onClick={ handleAscend }
                >Ascending Order of Age</button>
               
               <button className="filterButton" onClick={handleDesend}
                        >Decending Order of Age</button>

                        <div className="CityFilter">
                            <input type="text" placeHolder="Enter City" className="cityInput" ref={myCity} />
                        <button className="filterButton" onClick={handleFlterByCity}
                >Filter By City</button>
                    </div>
                    
                    <div className="GenderFilter">
                        <select className="filterButton" ref={ myGender }>
                            <option>Please Select an Option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <button className="filterButton" onClick={handleFilterByGender}
                >Filter By Gender</button>
                </div>
                
                
         </div>
                    
                    </div>
                    <div className="formDiv">
                    <LeftBottom first10Data={first10Data}/>
                    </div>
                </div>

        

             
            {home ? <PaginationButton page={page} pages={pages} first10Data={first10Data} size={size} /> : asend ? <PaginationButton page={page} pages={pages} first10Data={Asend} size={size} /> : desend ?
                <PaginationButton page={page} pages={pages} first10Data={Desend} size={size} /> : cityF ? <PaginationButton page={page} pages={pages} first10Data={City} size={size} city={ city }/> : genderF ? <PaginationButton page={page} pages={pages} first10Data={Gender} size={size} city={ gender }/> : null }

           
            
            <div className="homeWrapper">
                { first10 && first10.map((item, i) => {
                    return <Right key={i} name={item.name} gender={item.gender} age={item.age} city={item.city} id={item._id} handleDelete={handleDelete} handleUpdate={ handleUpdate }/>
                })}
           </div>
        </div>
    )
}
