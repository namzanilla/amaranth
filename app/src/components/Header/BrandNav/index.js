import BrandNav from './BrandNav';
import {connect} from 'react-redux';
import {fetchCategoryBrandTree} from 'store/actions/category';
import {toggleBrandNavVisibility} from 'store/actions/app';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
    category: {
      brandTree: {
        0: {
          child: brands = [],
          id,
          name,
        } = {},
      } = {},
    } = {},
  } = state;

  return {
    languageId,
    brands,
    id,
    name,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryBrandTree: (languageId) => dispatch(fetchCategoryBrandTree(languageId)),
    toggleBrandNavVisibility: () => dispatch(toggleBrandNavVisibility()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandNav);
