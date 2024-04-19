import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../Atom/userAtom'
import { useToast } from '@chakra-ui/react'
import { useShowToast } from '../hooks/useShowToast'
import { IoLogOut } from "react-icons/io5"; //light
import { IoLogOutOutline } from "react-icons/io5"; //dark



const LogoutButton = () => {
    const setUserAtom = useSetRecoilState(userAtom)
    const toast = useShowToast()
    const { colorMode, toggleColorMode } = useColorMode()


    

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
 <Button position={"fixed"} top={"30px"} right={"30px"} size={"md"} onClick={handleClick}>
        {colorMode === 'light'? <IoLogOut size={"30px"}/> : <IoLogOutOutline size={"30px"}/>}
    </Button>
  )
}

export default LogoutButton