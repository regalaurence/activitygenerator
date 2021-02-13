import React from 'react';

const SelectMonth = (props) => {

  return (
    <div className="field">
      <label className="label" for="seasons">{props.label}</label>
      <div className="control" style={{ maxWidth: "160px" }}>
      <div className="select">
      <select id={props.agenda} name="months" form="addActivityForm" onChange={props.onSelect} >
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
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