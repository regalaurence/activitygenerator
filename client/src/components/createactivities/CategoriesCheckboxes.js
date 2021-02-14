import React from 'react';

const CategoriesCheckboxes = (props) => {

  // props.value = ['Sports']
  let availableCategories = ['Indoors', 'Outdoors', 'Sports', 'Adventures', 'Housework', 'Socializing', 'Relaxing', 'Online']

  // let isChecked = (name) => {
  //   return props.value.includes(name)
  // }

  return (
    <div className="columns is-multiline is-mobile">
      {/* <label>Choose categories:</label> */}
      {availableCategories.map(c => {
        return (
          <div className="column is-one-third-mobile is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-centered">
          <button id="categories" className="has-text-centered button-checkboxes">
          <figure className="image column is-vcentered is-centered">
              <img id="categories" className="image" name={c} style={{ maxWidth: "180px" }} src={"images/" + c + ".png"} onClick={props.onChange}/>
            </figure>
            </button><br />{c}
          </div>
        )
      })}
    </div>
  )
}

export default CategoriesCheckboxes;

{/* <figure className="image column is-vcentered is-centered">
              <img className="image column is-vcentered is-centered" style={{ maxWidth: "180px" }} src={"images/" + c + ".png"} />
            </figure> */}