import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ImageInput from "./imageInput";
import InputAdder from "./inputAdder";

const EditItemPage = () => {
    const navigate = useNavigate()

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [categories, setCategories] = useState([])

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [price, setPrice] = useState(0)
    const {id} = useParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/single/${id}`,).then(response => {
            setItem(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(
            () => {
                setLoading(false)
            }
        )

    }, [])
    useEffect(() => {

        if (item) {
            console.log(item)
            setName(item.name)
            setDetails(item.details)
            setPrice(item.price)
            setCategories(item.categories.map((category)=>(category.category.id)))
            setSizes(item.sizes.map((size)=>(size.size)))
            setColors(item.colors.map((color)=>(color.color.id)))
        }
    }, [item])
    const handleInput = (e, setValue) => {
        setValue(e.currentTarget.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_URL}/item/update`, {
            id:id,
            name: name,
            details: details,
            price: price,
            categories: categories,
            sizes:sizes,
            colors:colors
        }).then(response => {

        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
    }

    if (loading) return <h1>loading...</h1>
    return (
        <div>
            <div >
                <input onInput={(e) => {
                    handleInput(e, setName)
                }} value={name} name={"name"} type="text" placeholder={"Jméno"}/>
                <textarea onInput={(e) => {
                    handleInput(e, setDetails)
                }} value={details} name="details" id="" cols="30" rows="10" placeholder={"Detail produktu"}>

                </textarea>
                <input onInput={(e) => {
                    handleInput(e, setPrice)
                }} value={price} type="number" name="price" id="" placeholder={"Cena"}/>

                <div> <InputAdder config={{
                    setValues:setSizes,
                    values:sizes,
                    placeholder: "Velikosti"
                }}/>
                    <InputAdder config={{
                        setValues:setColors,
                        values:colors,
                        placeholder: "Barvy"
                    }}/>
                    <InputAdder config={{
                        setValues:setCategories,
                        values:categories,
                        placeholder: "Kategorie"
                    }}/></div>

                <button onClick={(e)=>{handleSubmit(e)}}>Upravit</button>
            </div>
            <div>
                <ImageInput number={1} item={item} />
                <ImageInput number={2} item={item} />
                <ImageInput number={3} item={item} />
            </div>

        </div>
);
};

export default EditItemPage;