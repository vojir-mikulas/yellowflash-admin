import React, {useState} from 'react';
import {useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Items = () => {
    const [items,setItems] = useState([])
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item`,).then(response => {
            setItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(
            () => {
                setLoading(false)
            }
        )

    }, [])
    const handleDelete = (id) =>{
         axios.delete(`${process.env.REACT_APP_SERVER_URL}/item/single/${id}`,).catch(error => {
            console.error("Error fetching data: ", error)
        })

        let arr = [...items]
        let item = arr.find((item)=>(item.id === id))
        let index = arr.indexOf(item);
        console.log(index)
        if (index !== -1) {
            arr.splice(index, 1);
            setItems(arr)
        }

    }
    if (loading) return
    return (
        <div>
            <ul>
                {items.map((item)=>{

                    return(
                        <div onClick={()=>(navigate("./" + item.id))} style={{cursor:"pointer"}}>
                            <img style={{width:"100px",height:"100px",objectFit:"contain"}}src={`http://localhost:3000/${item.images[0] ? item.images[0].url : "xd"}`} alt={"preview"}/>
                            <h2>{item.name}</h2>
                            <p>
                                {item.details}
                            </p>
                            <span>{item.price} CZK</span>
                            <ul>
                                <li>
                                    Velikosti: {item.sizes.map((size)=>(` ${size.size} `)).join(",")}
                                </li>
                                <li>
                                    Kategorie: {item.categories.map((category)=>(` ${category.category.title} `)).join(",")}
                                </li>
                                <li>
                                    Barvy: {item.colors.map((color)=>(` ${color.color.name} `)).join(",")}
                                </li>
                            </ul>
                            <h2 style={{color:"red"}} onClick={(e)=>{
                                e.cancelBubble = true;
                                if (e.stopPropagation) e.stopPropagation();

                                handleDelete(item.id)
                            }}>SMAZAT</h2>
                        </div>
                    )
                })}
            </ul>
            <button onClick={()=>{
            navigate("./create")
            }}>Vytvořit položku</button>
        </div>
    );
};

export default Items;