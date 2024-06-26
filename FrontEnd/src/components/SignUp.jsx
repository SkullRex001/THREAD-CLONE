import React from 'react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import { authAtom } from '../Atom/authAtom'
import { userAtom } from '../Atom/userAtom'



const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const authAtomState = useSetRecoilState(authAtom)
    const toast = useToast()
    const [inputs , setInputs] = useState({
        name : "",
        username : "",
        email : "",
        password : ""
    })

    const setUserAtom = useSetRecoilState(userAtom)



    const handleClick = () => {
        authAtomState('login')
    }

    const handleSignup = async () =>{
        
      
        try {
     
            const res = await fetch('/api/users/signup' , {
                method : "POST",
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify(inputs)
            })

            const data = await res.json()

            if(data.success){
                toast({
                    title: `Success`,
                    description: `Account has been created`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
            }
          

            if(data.error){
                toast({
                    title: `Error`,
                    description: `${data.error}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  }

                )

                return;
            }

            localStorage.setItem('user-threads' , JSON.stringify(data))

            setUserAtom(data)
          
            

            
        } catch (error) {

            console.log("hii")
            if(error){
                toast({
                    title: `Error`,
                    description: `${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  }
    
                )

                return;
            

            }
          
            
        }

    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text" onChange={(e)=>{
                                        setInputs({...inputs , name: e.target.value})
                                    }}/>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" onChange={(e)=>{
                                        setInputs({...inputs , username : e.target.value })
                                    }}/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"  onChange={(e)=>{
                                setInputs({...inputs , email : e.target.value})
                            }}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>{
                                    setInputs({...inputs , password : e.target.value })
                                }} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }} onClick={handleSignup}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} onClick={handleClick}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default SignUp