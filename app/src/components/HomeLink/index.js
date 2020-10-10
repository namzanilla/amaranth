import HomeLink from './HomeLink';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    languageId: state.app.languageId,
  }
};

export default connect(mapStateToProps)(HomeLink);
