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
        if (Object.keys(this.props.categories).length === 1) {
          this.props.removeAllCategories();
        } else {
          this.props.removeSingleCategory(category);
        }
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
      const className = this.props.categories[category] ? "category-select-button category-select-button-selected" : "category-select-button";

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
        <h3>Filter by Category</h3>
        <div className="category-select-buttons">
          { this.categoryButtons() }
          <button className="category-select-button category-select-button-clear" onClick={ this.removeAllCategories }>
            Clear Filters
          </button>
        </div>
      </div>
    );
  }
}

export default CategorySelect;
