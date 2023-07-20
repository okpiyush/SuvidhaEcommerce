import React,{useContext, useEffect, useState} from 'react'
import useGetAuth from '../../Hooks/useGetAuth';
import { LoginContext } from '../../Contexts/LoginContext';
import Loading from '../Loader/Loading';
import Order from './Order';

const Orders = () => {
  const [order,setOrder]=useState(null);
  const [loading,setLoading]=useState(true);
  const {loginData}=useContext(LoginContext);
  const url=`http://localhost:5001/api/order/find/${loginData._id}`
  console.log(loginData.accessToken);
  const orders=useGetAuth(url,loginData.accessToken);
  useEffect(() => {
    setOrder(orders);
    setLoading(false);
  }, [orders]);
  return (
    <div>
        <h1 className="title">My Orders</h1>
        {loading?

        <Loading/>
        :
        <div>
          {
            !order&&
            <div>
            No Orders yet....
            </div>
          }
          {
            order&&
            <div>
             {
              order.map((item)=>{
                  return (<Order item={item} key={item._id}/>)
              })
              }
            </div>
          }
        </div>
        }
    </div>
  )
}

export default Orders