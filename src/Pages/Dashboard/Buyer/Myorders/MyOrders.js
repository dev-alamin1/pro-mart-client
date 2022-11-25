import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Context/Authprovider';

import MyOrdersRow from './MyOrdersRow';

const MyOrders = () => {

    const {user} = useContext(AuthContext)

    // const [orders,setOrders] = useState([]);

    // useEffect(()=>{
    //     if(user?.email)
    //     {
    //         fetch(`http://localhost:5000/orders?email=${user?.email}`)
    //         .then(res=>res.json())
    //         .then(data=>setOrders(data))
    //     }
    // },[user?.email])


 
    const {data:orders = [],refetch,isLoading} = useQuery(
        {
            queryKey:['orders',user?.email],
             queryFn:async()=>{
                
             const res = await  fetch(`http://localhost:5000/orders?email=${user?.email}`)
             const data = res.json();
             return data;
                
            }
        }
    );

   


    


    return (
        <div>
            <h2 className="text-4xl mb-5 text-center mt-2 text-red-400">My Orders </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order,index)=><MyOrdersRow key={order._id} order={order} index={index}/>)}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default MyOrders;