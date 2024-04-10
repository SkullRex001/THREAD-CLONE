import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Avatar, Box, Text, Image } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal

  } from '@chakra-ui/react'



const UserPost = ({ likes, replies, postImg, postTitle }) => {
    const [liked, setLiked] = useState(false)
    
    return (
        <Link to={"/markzukerberg/post/1"}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size={"md"} name='Mark Zukerberg' src='/zuck-avatar.png' />
                    <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={'relative'} w={"full"}>
                        <Avatar
                            size={"xs"}
                            name='jon'
                            src='https://bit.ly/dan-abramov'
                            top={"0px"}
                            left={"15px"}
                            padding={"2px"}
                            position={"absolute"}
                        />
                        <Avatar
                            size={"xs"}
                            name='jon'
                            src='https://bit.ly/tioluwani-kolawole'
                            bottom={"0px"}
                            right={"-5px"}
                            padding={"2px"}
                            position={"absolute"}
                        />
                        <Avatar
                            size={"xs"}
                            name='jon'
                            src='https://bit.ly/ryan-florence'
                            bottom={"0px"}
                            left={"4px"}
                            position={"absolute"}
                        />

                    </Box>

                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>markzukerberg</Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>

                        <Flex gap={4} alignItems={"center"} onClick={(e) => { e.preventDefault() }}>
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

                    <Text fontSize={"sm"}> {postTitle}</Text>
                    {
                        postImg && <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>

                            <Image src={postImg} w={"full"} />

                        </Box>
                    }

                    <Actions liked={liked} setLiked={setLiked} />

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>
                            {replies} replies
                        </Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>
                            {likes} likes
                        </Text>

                    </Flex>


                </Flex>




            </Flex>
        </Link>
    )
}

export default UserPost