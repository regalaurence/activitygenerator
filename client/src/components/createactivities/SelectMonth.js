import React from 'react';

const SelectMonth = (props) => {

  return (
    <div className="field">
      <label className="label" for="seasons">{props.label}</label>
      <div className="control" style={{ maxWidth: "160px" }}>
      <div className="select">
      <select id={props.agenda} name="months" form="addActivityForm" onChange={props.onSelect} >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      </div>
      </div>
    </div>
  )
}

export default SelectMonth;


{/* <div className="field">
<label className="label">Possible roughly until:</label>
<div className="control" style={{ maxWidth: "100px" }}>
  <input className="input" type="number" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
</div>
</div> */}