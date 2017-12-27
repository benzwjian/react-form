import React, { Component } from 'react';
import Field from './Field';
import CourseSelect from './CourseSelect';

class App extends Component {
  state = {
    fields: {
      name: '',
      email: '',
      department: null,
      course: null
    },
    fieldErrors: {},
    people: []
  };

  onInputChange = ({name, value, error}) => { //parameter context matching
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({fields, fieldErrors});
  };

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: ''
      }
    });
  };

  isEmail = (email) => true;

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (!person.course) return true;
    if (!person.department) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')} />

          <br />

          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (this.isEmail(val) ? false : 'Invalid Email')} />

          <br />

          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange} />

          <input type='submit' disabled={this.validate()} />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email, department, course}, i) => <li key={i}>{[name, email, department, course].join(' - ')}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
