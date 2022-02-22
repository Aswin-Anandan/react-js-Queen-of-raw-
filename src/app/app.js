import React, { Component } from "react";
import { Provider } from "react-redux";
import { store, history } from "./store";
import Routes from "./router";
import Theme from "./theme";
import { NotificationContainer } from "./components/notifications";
import red from '@material-ui/core/colors/red';
import {createMuiTheme} from "@material-ui/core/styles"
import { api, catchHandler } from "./helpers/axios";
import config from "../config";
import socketIOClient from "socket.io-client"
const socket = socketIOClient(config.socketioURL);

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      //primaryColor: '#2196f3',   //blue from mui
      primaryColor: '#7c98b6',   //light blue from Tiffanys, color for brand branding
      secondaryColor: '#e91e63',  //pink from mui 
      loginLogoUrl: ""
    }
  }

  getDynamicData(){
    return api()
      .get(config.routes.dynamicData)
      .catch(catchHandler)
  }

  async componentDidMount(){
    let res = await this.getDynamicData()
    if(res && res.data && res.data.color1)
      this.setState({primaryColor: res.data.color1})
    if(res && res.data && res.data.color2)
      this.setState({secondaryColor: res.data.color2})
    if(res && res.data && res.data.loginlogo)
      this.setState({loginLogoUrl: res.data.loginlogo})
    if(res && res.data && res.data.upperleftlogo)
      this.setState({upperLeftLogo: res.data.upperleftlogo})
  }
  render() {
    let theme = {};
    theme = {
      palette: {
        primary: {
          main: this.state.primaryColor   //blue default
        },
        secondary: {
          main: this.state.secondaryColor   //pink default
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2
      },
      loginLogoUrl: this.state.loginLogoUrl,
      upperLeftLogo: this.state.upperLeftLogo ? this.state.upperLeftLogo : undefined 

    };
    const muiTheme = createMuiTheme(theme);
    return (
      <Provider store={store}>
          <Theme theme={muiTheme}>
            <Routes history={history} socket={socket} upperLeftLogo={this.state.upperLeftLogo}/>
            <NotificationContainer/>
          </Theme>
      </Provider>
    );
  }
}

export default App;
