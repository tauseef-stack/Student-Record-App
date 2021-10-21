
import { useState } from 'react';
import './leftBottom.css';
import axios from 'axios';
export const LeftBottom = ({first10Data,modal,mydata}) => {
    const [data,setData] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const formData = {
            [name]:value,
        }
        setData({...data,...formData})
    }

    

    const Post = async () => {
       await axios.post('http://localhost:5555/student/post', data).then((res) => {
            if (res.status === 201) {
                alert('your Data is Posted Successfully')
                setData({});
               // first10Data();
            }
        }).catch((err) => {
            console.log(err)
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (modal) {
            mydata(data)
        }
        else {
            Post()
        }
     
    }
      
    return (
        <div className="formContainer">
           
            <div className="formWrapper">
                <form className="formCont" onSubmit={handleSubmit}>
                    <input placeholder="EnterStudentName" className="InputBox" type="text" name="name" onChange={handleChange}/>
                    <input placeholder="Enter Student's Gender" className="InputBox" type="text" name="gender" onChange={handleChange}/>
                    <input placeholder="Enter Student's age" className="InputBox" type="number" name="age" onChange={handleChange}/>
                    <input placeholder="Enter Student's City" className="InputBox" type="text" name="city" onChange={handleChange} />
                    <input type="submit" className="InputButton" />
                   
               </form>
            </div>
        </div>
    )
}
