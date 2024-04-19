import React, { useState } from 'react'
import { Avatar, Box, Flex, VStack, Text, Link, Button } from '@chakra-ui/react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import './UserHeader.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem, Portal
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { searchUser } from '../Atom/userSearch'
import { userAtom } from '../Atom/userAtom'

import { Link as LinkRouter} from 'react-router-dom'
import { useShowToast } from '../hooks/useShowToast'



const UserHeader = () => {
    const searchUserValue = useRecoilValue(searchUser)
    const setSearchUserValue = useSetRecoilState(searchUser)
    const LoggedInUser = useRecoilValue(userAtom)
    const Toast = useShowToast()

    const [updating , setUpdating] = useState(false)


    const [following  , setFollowing] = useState(searchUserValue.followers.includes(LoggedInUser.user._id))
   

    const handleFollowUnfollow = async()=>{
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/follow/${ searchUserValue._id}` , {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            const data = await res.json()

      
            if(data.error) {
              return  Toast("Error" , data.error , "error")
            }

            setSearchUserValue(data.user)


            setFollowing(!following)
         
            
        } catch (error) {

            console.log(error.message)
            Toast("Error" , error.message , "error")  
        }
        finally{
            setUpdating(false)
        }
    }



    const toast = useToast()
    function copyUrl() {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Link Copied',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        })


    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>{searchUserValue.name}</Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"}>{searchUserValue.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}> threads.next </Text>
                    </Flex>

                </Box>
                <Box>
                    <Avatar name='Mark ZukerBerg' src={searchUserValue.profilePic} size={"xl"} />

                </Box>
            </Flex>


            <Text>"{searchUserValue.bio}" </Text>

            {LoggedInUser.user._id === searchUserValue._id?
               <LinkRouter  to={"/update"}>
                <Button size={"sm"}>Update Profile</Button>
                </LinkRouter> : <Button onClick={handleFollowUnfollow} isLoading = {updating}>{following? "Unfollow" : "Follow"}</Button>

            }

            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text>{searchUserValue.followers.length} followers</Text>
                    <Box></Box>
                    <Link>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className='icon-container'>

                        <Menu>
                            <MenuButton>  <CgMoreO size={24} cursor={"pointer"} /></MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem onClick={copyUrl}>Copy-Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>

            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text >Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text >Replies</Text>

                </Flex>
            </Flex>



        </VStack>
    )
}

export default UserHeader