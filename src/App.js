import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import logo from './logo.svg';
import './styles/App.css';
import firebase from './firebase/firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Welcome to React',
      street: '',
      formError: {
        street: false,
        streetText: 'Please fill out street',
        ward: false,
        wardText: 'Please fill out both ward and district',
        district: false,
        districtText: 'Please fill out both ward and district',
      },
    };
    this.inputRefs = {};
  }

  componentDidMount() {
  }

  handleSubmit = ($event) => {
    $event.preventDefault();
    const ward = this.inputRefs.ward.value;
    const district = this.inputRefs.district.value;
    const city = this.inputRefs.city.value;
    const street = this.inputRefs.street.value;
    const r = this.validate();
    if (!r) {
      this.setState({
        formError: {
          ...this.state.formError,
          ward: true,
          district: true,
        },
      });
    } else {
      this.setState({
        formError: {
          ...this.state.formError,
          ward: false,
          district: false,
        },
      });
      firebase.database().ref(`addresses/${uuid()}`).set({
        street,
        ward,
        district,
        city,
        dateCreated: Date.now(),
        dateModified: Date.now(),
      });
    }
  }

  assignInputRef = name => (ref) => {
    this.inputRefs[name] = ref;
  }

  validate = () => {
    const ward = this.inputRefs.ward.value;
    const district = this.inputRefs.district.value;
    const city = this.inputRefs.city.value;
    if (!city && (!ward || !district)) return false;
    return true;
  }

  render() {
    const { formError } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.header}</h1>
        </header>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <form onSubmit={this.handleSubmit}>
              <div className="ms-Grid-col ms-sm6 ms-md3 ms-lg3">
                <TextField
                  placeholder="Street."
                  ariaLabel="Please enter text here"
                  required
                  errorMessage={formError.street ? formError.streetText : ''}
                  defaultValue={this.state.street}
                  componentRef={this.assignInputRef('street')}
                />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md3 ms-lg3">
                <TextField
                  placeholder="Ward"
                  ariaLabel="Please enter text here"
                  defaultValue={this.state.ward}
                  errorMessage={formError.ward ? formError.wardText : ''}
                  componentRef={this.assignInputRef('ward')}
                />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md3 ms-lg3">
                <TextField
                  placeholder="District"
                  ariaLabel="Please enter text here"
                  defaultValue={this.state.district}
                  errorMessage={formError.district ? formError.districtText : ''}
                  componentRef={this.assignInputRef('district')}
                />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md3 ms-lg3">
                <TextField
                  placeholder="City"
                  ariaLabel="Please enter text here"
                  defaultValue={this.state.city}
                  componentRef={this.assignInputRef('city')}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
