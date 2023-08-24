import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Card,
    Divider,
    List,
    ListItem,
    ListItemAvatar
  } from "@mui/material";


export default function SongQueue(props) {
 
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        checkQueue();
    }, []);

    useEffect(() => {
        const interval = setInterval(checkQueue, 3000);
        return (() => clearInterval(interval));
    });

    async function checkQueue() {
        // ensure response is OK
        await fetch('/spotify/get-queue')
            .then((response) => response.json())
            .then((data) => {
                setQueue(data);
                });
    }

    return (
        <Card width="100%">
            <Typography component="h5" variant="h5" align="center" margin="5px" height="3vh">Next In Queue</Typography>
            <Divider />
            <List className="scrollable" sx={{
                pt:0,
            }}>
                {queue
                    ? queue.map((song)=>(
                        <div key={song.id}>
                            <ListItem sx={{pl:0}}>
                                <ListItemAvatar height="100%">
                                    <img src={song.image.url} width="50"/>
                                </ListItemAvatar>
                                <div>
                                    <Typography component="h6" variant="h6">
                                            {song.name}
                                    </Typography>
                                    <Typography color="textSecondary" variant="subtitle2">
                                        {song.artists.join(", ")}
                                    </Typography>
                                </div>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>))
                        : null}
            </List>
        </Card>

    );

}