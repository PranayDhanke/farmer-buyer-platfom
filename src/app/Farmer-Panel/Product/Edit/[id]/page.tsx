import FarmerPanel from '@/components/Farmer/FarmerPanel'
import React from 'react'

const page = ({params:id}:{params:{id:any}}) => {
  return (
    <div>
        <FarmerPanel isEdit={true} id={id}  />
    </div>
  )
}

export default page