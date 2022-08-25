import React, {useEffect, useState} from 'react';
import axios from "axios";

const ImageInput = (props) => {
    const [loading,setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(()=>{
        setPreview(`${process.env.REACT_APP_SERVER_URL}/${props.item.images[props.number - 1] ? props.item.images[props.number - 1].url : ""}`)
        setLoading(false)
    },[])
    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    const handleImageChange  = (e) =>{
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let file = e.currentTarget.files[0]
        setSelectedFile(file)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/images`, {
            itemId: props.item.id,
            imgName: `image${props.number}`,
            image: file
        },{
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    if(loading) return
    return (
        <div>
            <input onChange={handleImageChange} type="file"
                   id={props.name} name={props.name}
                   accept="image/png, image/jpeg" />
            <img src={preview} style={{width:"100px",height:"100px"}} />
        </div>
    );
};

export default ImageInput;