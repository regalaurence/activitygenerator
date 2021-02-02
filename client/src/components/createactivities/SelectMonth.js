import React from 'react';

const SelectMonth = (props) => {

  return (
    <div className="field">
      <label className="label" for="seasons">{props.label}</label>
      <div className="control" style={{ maxWidth: "160px" }}>
      <div class="select">
      <select id={props.agenda} name="months" form="addActivityForm" onChange={props.onSelect} >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
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