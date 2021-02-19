import React from 'react';

class CategoriesCheckboxes extends React.Component {

  render() {
    // props.value = ['Sports']
    let availableCategories = ['Indoors', 'Outdoors', 'Sports', 'Adventures', 'Housework', 'Socializing', 'Relaxing', 'Online']

    let isChecked = (name) => {
      if (this.props.value.includes(name)) {
        return  "btn-selected"
      }
      else return "btn-not-selected"
    }

    return (
      <div className="columns is-multiline is-mobile">
        {/* <label>Choose categories:</label> */}
        {availableCategories.map(c => {
          console.log("CHECK THIS NAME:" + c)
          return (
             <div className="column is-one-third-mobile is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-centered">
              <button id="categories" value={c} className={isChecked(c)} type="checkbox">
                <figure className="image column is-vcentered is-centered">
                  <img id="categories" alt="category" className="image" name={c} style={{ maxWidth: "180px" }} src={"images/" + c + ".png"} onClick={this.props.onChange} />
                </figure>
              </button><br />{c}
            </div>
          )
        })}
      </div>
    )
  }
}

export default CategoriesCheckboxes;
