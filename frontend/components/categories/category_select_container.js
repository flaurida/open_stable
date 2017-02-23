import { connect } from 'react-redux';
import { addSingleCategory, removeSingleCategory, removeAllCategories } from '../../actions/category_actions';
import CategorySelect from './category_select';

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  addSingleCategory: category => dispatch(addSingleCategory(category)),
  removeSingleCategory: category => dispatch(removeSingleCategory(category)),
  removeAllCategories: () => dispatch(removeAllCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect);
