import React, {useState} from 'react';

const InputAdder = ({config}) => {

    const [error,setError] = useState(false)
    const handleOnChange = (e) => {
         if(e.currentTarget.value === "") return
        if(e.key === "Enter"){
            let arr = [...config.values]
            if(arr.find((value)=>(value === e.currentTarget.value))) return setError(true)
            arr.push(e.currentTarget.value)
            config.setValues(arr)
            e.currentTarget.value = "";
            setError(false)
        }
    }
    return (
        <div>
            <div> {config.values.map((value,index)=>{
                return(
                    <span key={value} onClick={()=>{
                        let arr = [...config.values]
                        arr.splice(index,1)
                        config.setValues(arr)
                    }}>{value}</span>
                )
            })}</div> <br/>
            <input placeholder={config.placeholder} onKeyDown={handleOnChange} type="text"/>
            {error && <span style={{color:"red"}}>Položka je již v seznamu</span>}
        </div>
    );
};

export default InputAdder;