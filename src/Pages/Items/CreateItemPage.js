import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"

const CreateItemPage = () => {

    const navigate = useNavigate()

    const [name,setName] = useState("")
    const [details,setDetails]  = useState("")
    const [price,setPrice]  = useState(0)


    const handleInput = (e,setValue)=>{
        setValue(e.currentTarget.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_URL}/item/create`,{
            name: name,
            details:details,
            price:price
        }).then(response => {
        navigate(`./../${response.data.id}`, {replace:true})
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onInput={(e)=>{handleInput(e,setName)}} value={name} name={"name"} type="text" placeholder={"Jméno"}/>
                <textarea onInput={(e)=>{handleInput(e,setDetails)}} value={details} name="details" id="" cols="30" rows="10" placeholder={"Detail produktu"}>

                </textarea>
                <input onInput={(e)=>{handleInput(e,setPrice)}} value={price} type="number" name="price" id="" placeholder={"Cena"}/>
                <button>Vytvořit</button>
            </form>
        </div>
    );
};

export default CreateItemPage;