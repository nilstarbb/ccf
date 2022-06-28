import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'

import {
  Container,
  Heading,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import tripService from './services/trips'
import deliveryService from './services/deliverys'

const App = () => {
  const [trips, setTrips] = useState([])
  const [deliverys, setDeliverys] = useState([])

  useEffect(() => {
    tripService.getAll().then((trips) => setTrips(trips))
    deliveryService.getAll().then((deliverys) => setDeliverys(deliverys))
  }, [])

  const createNewDelivery = (newDelivery) => {
    deliveryService
      .create(newDelivery)
      .then((returnedDelivery) => {
        setDeliverys(deliverys.concat(returnedDelivery))
      })
      .catch((error) => {
        console.log(error.response)
        return
      })
  }

  const deleteDelivery = (deleteDelivery_id) => {
    let confirm = window.confirm(
      'Are you sure you want to delete this delivery?'
    )
    if (confirm) {
      deliveryService
        .remove(deleteDelivery_id)
        .then((response) => {
          setDeliverys(
            deliverys.filter((delivery) => delivery.id !== deleteDelivery_id)
          )
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const CreateNewDelivery = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Box align="right">
          <Button onClick={onOpen} mb="1rem">
            New Delivery
          </Button>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Delivery</ModalHeader>
            <ModalCloseButton />
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createNewDelivery({
                  trip_id: e.target.trip_id.value,
                  delivery_id: e.target.delivery_id.value,
                  location: e.target.location.value,
                  city: e.target.city.value,
                  qty_delivered: e.target.qty_delivered.value,
                })
                onClose()
              }}
            >
              <ModalBody>
                <FormControl mt={4}>
                  <FormLabel>Trip</FormLabel>
                  <Select name="trip_id" placeholder="Select a trip">
                    {trips.map((trip) => (
                      <option key={trip.trip_id} value={trip.trip_id}>
                        {trip.trip_id}/{trip.driver}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Delivery</FormLabel>
                  <Select name="delivery_id" placeholder="Select a delivery">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Location</FormLabel>
                  <Input name="location" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>City</FormLabel>
                  <Input name="city" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Qty. Delivered</FormLabel>
                  <Input type="number" name="qty_delivered" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit">Create</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <Container maxW="6xl">
      <Box mx="auto" my="6rem">
        <Heading as="h1" mx="auto" textAlign="center">
          Trip & Delivery
        </Heading>
        <Tabs variant="soft-rounded" my="3rem">
          <TabList>
            <Tab textTransform="uppercase">Trips</Tab>
            <Tab textTransform="uppercase">Deliverys</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Trip ID</Th>
                      <Th>Driver</Th>
                      <Th>Vehicle</Th>
                      <Th>Vehicle2</Th>
                      <Th isNumeric>Qty.</Th>
                      <Th>Start</Th>
                      <Th>End</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {trips.map((trip) => (
                      <Tr key={trip.trip_id}>
                        <Td>{trip.trip_id}</Td>
                        <Td>{trip.driver}</Td>
                        <Td>{trip.vehicle}</Td>
                        <Td>{trip.vehicle2}</Td>
                        <Td isNumeric>{trip.qty}</Td>
                        <Td>
                          {trip.start_timestamp.slice(0, 19).replace('T', ' ')}
                        </Td>
                        <Td>
                          {trip.end_timestamp.slice(0, 19).replace('T', ' ')}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <CreateNewDelivery />
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Trip ID</Th>
                      <Th>Delivery ID</Th>
                      <Th>Location</Th>
                      <Th>City</Th>
                      <Th isNumeric>Qty. Delivered</Th>
                      <Th isNumeric></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {deliverys.map((delivery) => (
                      <Tr key={delivery.id}>
                        <Td>{delivery.trip_id}</Td>
                        <Td>{delivery.delivery_id}</Td>
                        <Td>{delivery.location}</Td>
                        <Td>{delivery.city}</Td>
                        <Td isNumeric>{delivery.qty_delivered}</Td>
                        <Th isNumeric>
                          <Button
                            size="xs"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => deleteDelivery(delivery.id)}
                          >
                            Delete
                          </Button>
                        </Th>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default App
