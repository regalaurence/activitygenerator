import React from 'react';

const CategoriesCheckboxes = (props) => {

  // props.value = ['Sports']
  let availableCategories = ['Indoors', 'Outdoors', 'Sports', 'Adventures', 'Housework', 'Socializing', 'Relaxing', 'Online']

  let isChecked = (name) => {
    return props.value.includes(name)
  }

  return (
    <div className="columns is-multiline is-mobile">
      {/* <label>Choose categories:</label> */}
      {availableCategories.map(c => {
        return (
          <div className="column is-one-third-mobile is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd">

            <figure className="image column is-vcentered is-centered">
              <img style={{ maxWidth: "180px" }} src={"images/" + c + ".png"} />
            </figure>
            <label for={c} className="has-text-centered">{c + " "}</label>
            <input type="checkbox" id="categories" name={c} checked={isChecked(c)} onChange={props.onChange} /><br />
          </div>

        )
      })}
    </div>
  )
}

export default CategoriesCheckboxes;