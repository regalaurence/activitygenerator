import React from 'react';

const CategoriesCheckboxes = (props) => {

  let availableCategories = ['indoors', 'outdoors', 'sports', 'adventures', 'housework', 'socializing', 'relaxing', 'online']

  return (
    <>
      <label>Categories:</label><br />
      {availableCategories.map(c => {
        return (
          <>
            <label for={c}>{c + ":"}</label>
            <input type="checkbox" id="categories" name={c} value={props.value} onChange={props.onChange} /><br />
          </>
        )
      })}
    </>
  )
}

export default CategoriesCheckboxes;