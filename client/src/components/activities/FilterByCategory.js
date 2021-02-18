import React from 'react'

class FilterByCategory extends React.Component {

  render() {
    return (
      <div className="field center">
      <label className="label mt-2" for="seasons">Filter by Categories: </label>
      <div className="control ml-3" style={{ maxWidth: "160px" }}>
      <div className="select">
      <select id="categoriesToFilterBy" name="categoriesToFilterBy" onChange={this.props.handleFilterChange} >
        <option value="">No filter</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Indoors">Indoors</option>
        <option value="Alone">Alone</option>
        <option value="Sports">Sports</option>
        <option value="Adventures">Adventures</option>
        <option value="Housework">Housework</option>
        <option value="Socializing">Socializing</option>
        <option value="Relaxing">Relaxing</option>
        <option value="Online">Online</option>
        <option value={this.props.user._id}>Created by me</option>
      </select>
      </div>
      </div>
    </div>
    )
  }
}

export default FilterByCategory