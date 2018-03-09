import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (e) => {
    e.preventDefault()
    const filter = e.target.value
    this.props.setFilter(filter)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
