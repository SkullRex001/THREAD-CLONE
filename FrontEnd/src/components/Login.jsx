import React from 'react'
import { useState } from 'react'
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

  import { useShowToast } from '../hooks/useShowToast'

  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import { authAtom } from '../Atom/authAtom'
import { userAtom } from '../Atom/userAtom'


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const authAtomState = useSetRecoilState(authAtom)

    const userAtomState = useSetRecoilState(userAtom)

    const showToast = useShowToast()

    const [inputs , setInputs] = useState({
        username : "",
        password : ""
    })

    const handleClick = ()=>{
        authAtomState('signup')
    }

    

    const handleButtonClick = async ()=>{

        try {

            const res = await fetch("/api/users/login" , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(inputs)
            })

            const data  = await res.json()
            if(data.error){

                return showToast("Error" , data.error , "error")         
            }

            localStorage.setItem("user-threads" , JSON.stringify(data))

            userAtomState(data)
            

            
        } catch (error) {

            showToast("Error" , error.message , "error")
            
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
          Log in
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          weclome back 👋
        </Text>
      </Stack>
      <Box
      w={"450px"}
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={inputs.username} onChange={(e)=>{
                setInputs({...inputs , username : e.target.value})
            }} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'}  value={inputs.password} onChange={(e)=>{
                setInputs({...inputs , password : e.target.value})
              }}/>
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
              }} onClick={handleButtonClick}>
              Login
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Do not have an account? <Link color={'blue.400'} onClick={handleClick}>SignUp</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default Login