import React, { useState } from 'react'

const usePreviewImg = ( ) => {
    const [imgUrl , setImgUrl] = useState(null)

    const handleImageChange = (e)=>{
        const file = e.target.files[0]

        // if (file.size > maxSizeInBytes) {
    

        //     alert("Image Size Should be Less than 1mb")
        //     return
        // }

        const reader = new FileReader();
        reader.readAsDataURL(file)
    

        reader.onloadend = ()=>{
            setImgUrl(reader.result)
        }

    }


    return {handleImageChange , imgUrl}


}

export default usePreviewImg