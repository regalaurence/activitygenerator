import React from 'react';

const CategoriesCheckboxes = (props) => {

  let availableCategories = ['Indoors', 'Outdoors', 'Sports', 'Adventures', 'Housework', 'Socializing', 'Relaxing', 'Online']

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
            <input type="checkbox" id="categories" name={c} value={props.value} onChange={props.onChange} /><br />
          </div>

        )
      })}
    </div>
  )
}

export default CategoriesCheckboxes;


{/* <figure className="image">
<img style={{ maxWidth: "512px" }} src="images/CloudFinalDarkText.png" />
</figure>
</div>
<div className="columns is-vcentered is-centered"> */}