import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CourseSelect extends Component {
	static propTypes = {
		department: PropTypes.string,
		course: PropTypes.string,
		onChange: PropTypes.func.isRequired
	}

	state = {
		department: this.props.department, //pattern: department is props assigned to state
		course: this.props.course,
		courses: [],
		_loading: false
	}

	componentWillReceiveProps(update) {
		this.setState({
			department: update.department,
			course: update.course
		})
	}

	fetch = (department) => {
		this.setState({_loading: true, courses: []})
		if (department === 'core') {
			this.setState({_loading: false, courses: ['A', 'B', 'C']})
		} else if (department === 'electives') {
			this.setState({_loading: false, courses: ['X', 'Y', 'Z']})
		}
	}

	onSelectDepartment = (evt) => {
		const department = evt.target.value
		const course = null
		this.setState({department, course})
		this.props.onChange({name: 'department', value: department})
		this.props.onChange({name: 'course', value: course})

		if (department) this.fetch(department)
	}

	onSelectCourse = (evt) => {
		const course = evt.target.value
		this.setState({course})
		this.props.onChange({name: 'course', value: course})
	}

	renderDepartmentSelect = () => {
		return (
			<select value={this.state.department || ''} onChange={this.onSelectDepartment}>
				<option value=''>Which department?</option>
				<option value='core'>NodeSchool: Core</option>
				<option value='electives'>NodeSchool: Electives</option>
			</select>
		)
	}

	renderCourseSelect = () => {
		if (this.state._loading) {
			return (
				<img src='/img/loading.png' />
			)
		} else if (!this.state.department) {
			return (
				<span></span>
			)
		} else {
			return (
				<select value={this.state.course || ''} onChange={this.onSelectCourse}>
					{['Which course', ...this.state.courses].map((course, i) => <option key={i} value={course}>{course}</option>)}
				</select>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderDepartmentSelect()}
				<br />
				{this.renderCourseSelect()}
			</div>
		)
	}
}

export default CourseSelect
