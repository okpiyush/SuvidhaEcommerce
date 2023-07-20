import axios from "axios";
import { useState,useEffect } from "react";

//defining the fetch function 
const useGetAuth=(url,accessToken)=>{
    const [data,setData]=useState();
    useEffect(()=>{
        const headers={
           "token":`Bearer ${accessToken}`
        }
        console.log(headers);
        const makeRequest=async()=>{
            try{
                const getData= await axios.get(url,"",headers)
                setData(getData.data);
            }catch(err){
                console.log("Error");
                return (err);
            }
        }
        makeRequest();
    },[url,accessToken]);
    return data;
}
export default useGetAuth;