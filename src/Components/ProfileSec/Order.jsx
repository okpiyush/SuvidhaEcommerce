import React,{useState} from 'react'
import "./index.css"
const Order = (props) => {
    const [collapsed,setCollapsed]=useState(false);
  return (
    <div className="OrderBox">
        <div onClick={()=>setCollapsed(!collapsed)}>
            {
            !collapsed?
                (
                    <div className="row">
                        <div className="flex-1">{props.item._id} </div>
                        <div className="flex-1">{props.item.amount} </div>
                        <div className="flex-1">{props.item.status}</div>
                    </div>
                ):
                (
                    <div className='row justify'>
                        <div className="flex-1">Order ID : {props.item._id}</div>
                        <button className="cbutton">
                        Close
                        </button>
                    </div>
                )            
            }
        </div>
        {
            collapsed&&
            <div className='Collapsed'>
                <div className="flex-1">Order Amount : <strong>{props.item.amount} </strong></div>
                <div className="flex-1">Order Status : {props.item.status}</div>
                <div className="">
                    Products : 
                    <ol type='1'>
                    {
                        props.item?.products && props.item.products.map((item)=>{
                            return <li className="productinOrder justify" key={item.productId}>
                                        <div>
                                        {item.productId}
                                        </div>
                                        <div>
                                        {item.quantity}
                                        </div>
                                    </li>
                        })
                    }
                    </ol>
                </div>
                <div>
                    Order Date : <strong>{props.item.createdAt.substring(0,10)}</strong>
                </div>

            </div>
        }
    </div>
  )
}

export default Order