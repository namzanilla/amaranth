import Header from './Header';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {
    app: {
      languageId,
    } = {},
  } = state;

  return {
    languageId,
  };
};

export default connect(mapStateToProps)(Header);
