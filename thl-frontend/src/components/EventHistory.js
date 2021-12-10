import { React, useState, useEffect } from 'react'
import eventService from '../services/eventService'
import { Table, TableCell, TableRow, TableContainer, TableHead, TableBody } from '@mui/material'
import dayjs from 'dayjs'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import IconButton from '@mui/material/IconButton'

const EventHistory = ({ form }) => {
    const [eventsById, setEventsById] = useState([])
    const [ascending, setAscending] = useState(false)

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = async () => {
        console.log(form.id)
        const events = await eventService.getEventsById(form.id)
        setEventsById(events)

    }

    const sortEventsByDate = async () => {
        const events = eventsById

        if (ascending) {
            setEventsById(events.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1))
            setAscending(false)
        } else {
            setEventsById(events.sort((a,b) => b.formState > a.formState ? 1 : -1))
            setAscending(true)
        }
    }

    return (
        <div>
            <h3>
                {form.thlRequestId}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Tapahtuma-aika
                                    <IconButton
                                        id="sortEventTime"
                                        onClick={sortEventsByDate}
                                        color="primary"
                                        size="large">
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">Käyttäjä
                                </TableCell>
                                <TableCell align="left">Tapahtuma
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventsById.slice().map(eventById => {
                                return (
                                    <TableRow id='eventListRow' key={eventById.id}>
                                        <TableCell align='left' id='createdAt'> {dayjs(eventById.createdAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                                        <TableCell align="left" id='createdBy'> {eventById.createdBy}</TableCell>
                                        <TableCell align="left" id='message'>{eventById.message}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </h3>
        </div>
    )
}

export default EventHistory