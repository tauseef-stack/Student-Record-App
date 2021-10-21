import './right.css';

export const Right = ({name,gender,age,city,id,handleDelete,handleUpdate}) => {
   // console.log(first10);
    // let arr = [];
    // for (var i = 0; i < pages ; i++){
    //     arr.push(i);
    // }
   
    return (
        <div className='rightContainer'>
            <div className='rightWrapper'>
               
            <div className="singleStudentContainer" >
                         <h3 className="nameHeading">Name: {name}</h3>
                        <h4 className="genderHeading">Gender: {gender}</h4>
                        <h3 className="ageHeading">Age: {age}</h3>
                            <h4 className="cityHeading">City: {city}</h4>
                    <button onClick={()=> handleUpdate(id) }className="compButton">Update</button>
                        <button onClick={()=>handleDelete(id)} className="compButton">Delete</button>
                        </div>  
            </div>
        </div>
    )
}
