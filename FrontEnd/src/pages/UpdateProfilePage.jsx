import React, { useRef, useState } from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react'
  import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import { userAtom } from '../Atom/userAtom'
import usePreviewImg from '../hooks/usePreviewImg'
import { useShowToast } from '../hooks/useShowToast'

const UpdateProfilePage = () => {

  const toast = useShowToast()
  const [updating , setUpdating] = useState(false)

    let {handleImageChange , imgUrl} = usePreviewImg()

    const fileRef = useRef(null)

    const [user , setUser] = useRecoilState(userAtom)


    const [inputs , setInputs] = useState({
        ...user.user , password : ''})

        const handleSubmit = async () =>{
          setUpdating(true)
          try {

            const res = await fetch(`api/users/updateprofile/${user.user._id}` , {
              method : "POST",
              headers : {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                ...inputs , profilePic : imgUrl
              })
            })

            const data = await res.json()
            if(data.error){
             return toast("Error" , data.error , "error")
            }
            
            if(data.user){
              toast("Success" , "Porfile Has Been Updated" , "success")

              setUser(data)
  
             return  localStorage.setItem("user-threads" , JSON.stringify(data))
            }

            // console.log(data.user)
            // imgUrl = null;
            return toast("Error" , "Please try again later" , "error")
            


          } catch (error) {

            toast("Error" , error.message , "error")
            
            
          }

          finally{
            setUpdating(false)
          }

        }
 


    return (
        <Flex
    
          align={'center'}
          justify={'center'}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
              User Profile Edit
            </Heading>
            <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar size="xl" src={imgUrl || inputs.profilePic}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full" onClick={()=>{
                    fileRef.current.click()
                  }}>Change Avatar</Button>
                  <Input type='file' hidden ref={fileRef} onChange={handleImageChange} accept='image/*'/>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="Name" >
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={inputs.name}
                onChange={(e)=>{setInputs({...inputs , name : e.target.value})}}
              />
            </FormControl>
            <FormControl id="Username">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={inputs.username}
                onChange={(e)=>{
                    setInputs({...inputs , username: e.target.value})
                }}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                value={inputs.email}
                onChange={(e)=>{
                    setInputs({...inputs , email : e.target.value})
                }}
              />
            </FormControl>
            <FormControl id="Bio">
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Your Bio"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                value={inputs.bio}
                onChange={(e)=>{
                    setInputs({...inputs , bio: e.target.value})
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: 'gray.500' }}
                type="password"
                value={inputs.password}
                onChange={(e)=>{
                    setInputs({
                        ...inputs , password : e.target.value
                    })
                }}
              />
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}>
                Cancel
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSubmit} isLoading = {updating}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )
}

export default UpdateProfilePage