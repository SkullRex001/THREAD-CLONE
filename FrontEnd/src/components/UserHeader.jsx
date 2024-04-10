import React from 'react'
import { Avatar, Box, Flex, VStack, Text, Link } from '@chakra-ui/react'
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

const UserHeader = () => {
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
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zukerberg</Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"}>@markzukerberg</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}> threads.next </Text>
                    </Flex>

                </Box>
                <Box>
                    <Avatar name='Mark ZukerBerg' src='/zuck-avatar.png' />

                </Box>
            </Flex>

            <Text>Lorem ipsum dolor sit amet.</Text>

            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text>3.2k followers</Text>
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