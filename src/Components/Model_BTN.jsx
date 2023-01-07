import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure,
  } from '@chakra-ui/react'
export const Model_BTN = ( handleDElete) => {
    console.log(handleDElete)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button onClick={onOpen}>Delete All Data</Button>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete All Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='bold' mb='1rem'>
                  All The Data Will Be  Deleted Completely From Memory
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='whatsapp' mr={3} onClick={onClose}>
                Cancle
              </Button>
              <Button variant='solid' onClick={handleDElete}  colorScheme='red'>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
