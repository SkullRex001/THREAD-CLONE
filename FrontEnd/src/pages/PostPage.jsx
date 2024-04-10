import React from 'react'
import { Flex, Avatar, Box, Text, Image , Divider , Button } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal

} from '@chakra-ui/react'

import { Input } from '@chakra-ui/react'

import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import { useState } from 'react'
import Comment from '../components/Comment'

const PostPage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} align={"center"} gap={3}>
          <Avatar name='Mark Zukerberg' src='/zuck-avatar.png' size={"md"} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzukerberg
            </Text>
            <Image src='/verified.png' w={4} h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <Menu>
            <MenuButton>
              <BsThreeDots />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem>Delete Post</MenuItem>
                <MenuItem>Edit Post</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
      <Text my={3}> Lorem ipsum dolor sit amet.</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>

        <Image src="/WhatsApp Image 2024-03-27 at 9.23.55 AM.jpeg" w={"full"} />

      </Box>

      <Actions liked={liked} setLiked={setLiked} />
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          200 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {123 + (liked?1:0) } likes
        </Text>
      </Flex>
      <Divider my={4}/>
      <Flex justifyContent={"space-between"} gap={4}>
        <Input placeholder='Comment' />
        <Button>Post</Button>
      </Flex>

      <Comment comment = "Looks great" 
      createdAt = '2d' 
      likes = {100}
      username = 'AdityaVikram'
      userAvatar = '/df49245d5acc44ccb81cd1dbc9a18e58_9366.webp'/>
      <Comment comment = "Looks great" 
      createdAt = '2d' 
      likes = {100}
      username = 'AdityaVikram'
      userAvatar = '/df49245d5acc44ccb81cd1dbc9a18e58_9366.webp'/>
      <Comment comment = "Looks great" 
      createdAt = '2d' 
      likes = {100}
      username = 'AdityaVikram'
      userAvatar = '/df49245d5acc44ccb81cd1dbc9a18e58_9366.webp'/>
   
    </>

  )
}

export default PostPage