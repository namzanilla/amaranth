import CategoryPage from './CategoryPage';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
    category: {
      [`info_${languageId}`]: {
        h1 = '',
      } = {},
    } = {},
  } = state;

  return {
    languageId,
    h1,
  };
};

export default connect(mapStateToProps)(CategoryPage);
