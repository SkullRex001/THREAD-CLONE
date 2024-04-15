import React from 'react'
import { Button } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../Atom/userAtom'
import { useToast } from '@chakra-ui/react'
import { useShowToast } from '../hooks/useShowToast'

const LogoutButton = () => {
    const setUserAtom = useSetRecoilState(userAtom)
    const toast = useShowToast()
    

    const handleClick = async ()=>{
        try {

            const res = await fetch('api/users/logout' , {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            const data = await res.json()

            console.log(data)

            if(data.error){
                toast("Error" , data.error , "error")
            }

            localStorage.removeItem('user-threads')

            setUserAtom(null)

            
        } catch (error) {

            console.log(error)
            toast("Error" , error.message , "error")
          

            
        }
    }



  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleClick}>
        Logout
    </Button>
  )
}

export default LogoutButton