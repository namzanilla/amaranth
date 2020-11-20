import ContactInfo from './ContactInfo';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    languageId: state.app.languageId,
  };
};

export default connect(mapStateToProps)(ContactInfo);
