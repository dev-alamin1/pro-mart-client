import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ReportedProductRows from './ReportedProductRows';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';

const ReportedProducts = () => {

    const {data:reportedProducts = [],isLoading,refetch} = useQuery(
        {
            queryKey:['reportedProducts'],
             queryFn:async()=>{
                
             const res = await  fetch(`http://localhost:5000/all/reported/products`,{
                headers:{
                    authorization:`bearer ${localStorage.getItem('accessToken')}`
                }
             })
             const data = res.json();
             return data;
                
            }
        }
    );


    // delete reported product 

    const reportedProductDelete = (product_id,_id) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });
    
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
    
                fetch(`http://localhost:5000/reported/product/delete/${_id}`, {
                    method: 'DELETE', 
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`

                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        
                        // first report collection theke delete hobe , er por main product theke delete hobe 

                        fetch(`http://localhost:5000/product/delete/${product_id}`, {
                            method: 'DELETE', 
                            headers: {
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                                
                            }
                        })
                        .then(res=>res.json())
                        .then(data=>{
                            if(data.deletedCount > 0)
                            {
                              refetch();
                              toast.success(`Reported product deleted successfully`)

                            }
                        })
                    }
                })
             
    
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
              );
            }
          });
      };


    if(isLoading)
    {
        return <div>Loading ....</div>
    }



    return (
        <div className='bg-purple-100'>
            <h2 className="text-4xl mb-5 text-center mt-2 text-red-400"> All Reported Mobile </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-teal-100'>
                        <tr>
                            <th>#</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Seller Mobile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedProducts.map((product,index)=><ReportedProductRows key={product._id} 
                        product={product} index={index} 
                        reportedProductDelete={reportedProductDelete}/>)}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default ReportedProducts;