import { Flex, Text, Button } from '@chakra-ui/react';
import React from 'react'

import { Link } from 'react-router-dom';



const UserNotFound = () => {
    return (
        <Flex align={"center"} justify={"center"} h={"80vh" } flexDir={"column"}>
   
            <Text fontSize={"xl"}>
            ⚠️ This is not the web page you are looking for!⚠️

            </Text>
           <Link to={"/"}><Button m={10}>Home</Button></Link> 
           
        </Flex>
    )
}

export default UserNotFound