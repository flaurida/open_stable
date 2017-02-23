import React from 'react';

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCategory = this.toggleCategory.bind(this);
    this.removeAllCategories = this.removeAllCategories.bind(this);
  }

  toggleCategory(category) {
    return e => {
      if (this.props.categories[category]) {
        this.props.removeSingleCategory(category);
      } else {
        this.props.addSingleCategory(category);
      }
    };
  }

  removeAllCategories(e) {
    this.props.removeAllCategories();
  }

  categoryButtons() {
    return window.CATEGORIES.map((category, i) => {
      const className = this.props.categories[category] ? "category-select selected" : "category-select";

      return (
        <button className={ className } onClick={ this.toggleCategory(category) } key={i}>
          { category }
        </button>
      );
    });
  }

  render() {
    return (
      <div className="category-select">
        <button className="category-select clear" onClick={ this.removeAllCategories }>See All</button>
        { this.categoryButtons() }
      </div>
    );
  }
}

export default CategorySelect;
