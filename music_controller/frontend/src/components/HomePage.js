import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
    Grid,
    Button,
    ButtonGroup,
    Typography
} from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Room from "./Room";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        roomCode: null,
    };
  }

  // async means we don't have to wait for the code to finish before continuing with
  // remaining code. When code is ready to go, then it will execute
  // this will also cause the homepage to rerender when this async is finished
  // covers when component is rendered for the first time
  async componentDidMount() {
    fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code
            });
        });
  }

  renderHomePage() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to='/join' component={ Link }>
                        Join a Room
                    </Button>
                    <Button color="secondary" to='/create' component={ Link }>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
            {
            // render here basically means this content will be called
            }
          <Route exact path="/" render={() => {
                return this.state.roomCode
                    ? (<Redirect to={`/room/${this.state.roomCode}`}/>)
                    : this.renderHomePage();
            }}/>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/room/:roomCode" component={Room} />
        </Switch>
      </Router>
    );
  }
}