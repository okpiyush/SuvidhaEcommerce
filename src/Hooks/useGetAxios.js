import axios from "axios";
import { useState,useEffect } from "react";

//defining the fetch function 
const useGetAxios=(url)=>{
    const [data,setData]=useState();
    useEffect(()=>{
        //fetching the data from the url
        //not defining a funciton because we will be calling it anyway for the data to be read;
        const makeRequest= async()=>{
            try{
                //setting the data to the return value of the axios.get function
                const getData=await axios.get(url);
                
                // destructing the data from the getData
                setData(getData.data);
            }catch(err){
                return {err};
            }
        }
        //making the request 
        makeRequest();
        // having url in the dependency array means we will be expecting useEffect to get on work every time the link changes
    },[url]);



    //returning the data value 
    return data;
}
export default useGetAxios;