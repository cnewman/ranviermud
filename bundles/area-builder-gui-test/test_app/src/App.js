import React, { Component } from "react";
import GridLayout from 'react-grid-layout';
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      selectValue: ""
    };
  }
  GenerateAreaGraph(apiResponse, selectedArea) {
    //console.log(apiResponse);
    return (
      Object.keys(apiResponse)
        .filter(key => apiResponse[key].name.valueOf() === selectedArea.valueOf())
        .map(function (key) {
          console.log(apiResponse[key])
          return (apiResponse[key].roomList.map((room, index) => {
            console.log(index)
            return (
              <div style={{ background: "#000FFF" }} key={index} data-grid={{x: index%6, y:Math.floor((index%6)/6)+2, w:2, h: 2, i:"hi"}}>{room.title}</div>
            );
          }));
        })
    );
  }
  GenerateDropdown(apiResponse) {
    //console.log(apiResponse);
    return (
      Object.keys(apiResponse)
        .map(function (key) {
          console.log(apiResponse[key])
          return (
            <option value={apiResponse[key].name}>{apiResponse[key].name}</option>
          );
        })
    );
  }
  callAPI() {
    fetch("http://localhost:3004/areas")
      .then(res => res.json())
      .then(res => {
        this.setState({ apiResponse: res });
      })
      .catch(err => err);
  }
  HandleDropdownChange = (e) => {
    this.setState({selectValue: e.target.value});
  }
  componentDidMount() {
    this.callAPI();
  }
  render() {
    return(
      <div>
        <select onChange={this.HandleDropdownChange}>
          <option value=""></option>
          {this.GenerateDropdown(this.state.apiResponse)}
        </select>
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          {this.GenerateAreaGraph(this.state.apiResponse, this.state.selectValue)}
        </GridLayout>
      </div>
    );
  }
}

//<p className="App-intro">{this.state.apiResponse}</p>
export default App;

// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { apiResponse: "" };
//     }

//     callAPI() {
//         fetch("http://localhost:9000/limbo")
//             .then(res => res.text())
//             .then(res => this.setState({ apiResponse: res }))
//             .catch(err => err);
//     }

//     componentDidMount() {
//         this.callAPI();
//     }

//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <img src={logo} className="App-logo" alt="logo" />
//                     <h1 className="App-title">Welcome to React</h1>
//                 </header>
//                 <p className="App-intro">{this.state.apiResponse}</p>
//             </div>
//         );
//     }
// }
//<p className="App-intro">{this.state.apiResponse}</p>