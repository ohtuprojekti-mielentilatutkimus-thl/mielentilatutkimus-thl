import { React, useState, useEffect } from 'react'
import eventService from '../services/eventService'
import { TableCell, TableRow, TableContainer, TableHead, TableBody } from '@material-ui/core'
import dayjs from 'dayjs'

const EventHistory = ({ form }) => {
    const [eventsById, setEventsById] = useState([])

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = async () => {

        const events = await eventService.getEventsById(form.id)
        setEventsById(events)

    }

    return (
        <div>
            <h2>
            Tapahtumahistoria
            </h2>
            <h3>
                {form.thlRequestId}
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Tapahtuma-aika
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
                </TableContainer>
            </h3>
        </div>
    )
}

export default EventHistory