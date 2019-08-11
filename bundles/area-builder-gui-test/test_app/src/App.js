import React, { Component } from "react";
import GridLayout from 'react-grid-layout';
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      ranvierAPIResponse: "",
      selectValue: ""
    };
  }
 /*
  * Take Area data from Ranvier API response and make the graph using react-grid-layout API
  * This function maps over the API response object from Ranvier and checks to figure out which rooms
  * are part of the currently selected (via dropdown) area and then create a graph node for each.
  */
  GenerateAreaGraph(ranvierAPIResponse, selectedArea) {
    return (
      Object.keys(ranvierAPIResponse)
        .filter(key => ranvierAPIResponse[key].name.valueOf() === selectedArea.valueOf())
        .map(function (key) {
          console.log(ranvierAPIResponse[key])
          return (ranvierAPIResponse[key].roomList.map((room, index) => {
            console.log(index)
            return (
              <div style={{ background: "#000FFF" }} key={index} data-grid={{x: (index*2)%6, y:index*2, w:2, h: 2, i:"hi"}}>{room.title}</div>
            );
          }));
        })
    );
  }
  /*
  * Take Area data from Ranvier API response and make a dropdown.
  * User can select an area from the dropdown and the area's rooms will be displayed.
  * This function maps over the API response object from Ranvier and just pulls each area name.
  */
  GenerateDropdown(ranvierAPIResponse) {
    return (
      Object.keys(ranvierAPIResponse)
        .map(function (key) {
          console.log(ranvierAPIResponse[key])
          return (
            <option value={ranvierAPIResponse[key].name}>{ranvierAPIResponse[key].name}</option>
          );
        })
    );
  }

  /*
  * When a new area is selected in the dropdown, change the value so React can re-render.
  */
  HandleDropdownChange = (e) => {
    this.setState({selectValue: e.target.value});
  }

  /*
  * Once the component mounts, call Ranvier's API (only locally, currently) so that we can
  * populate area grid and dropdown.
  */
  callAPI() {
    fetch("http://localhost:3004/areas")
      .then(res => res.json())
      .then(res => {
        this.setState({ ranvierAPIResponse: res });
      })
      .catch(err => err);
  }
  componentDidMount() {
    this.callAPI();
  }

  /*
  * Render the dropdown and area graph. The area graph uses react-grid-layout's API.
  */
  render() {
    return(
      <div>
        <select onChange={this.HandleDropdownChange}>
          <option value=""></option>
          {this.GenerateDropdown(this.state.ranvierAPIResponse)}
        </select>
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          {this.GenerateAreaGraph(this.state.ranvierAPIResponse, this.state.selectValue)}
        </GridLayout>
      </div>
    );
  }
}
export default App;