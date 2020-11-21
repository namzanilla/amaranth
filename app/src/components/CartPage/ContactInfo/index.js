import ContactInfo from './ContactInfo';
import {connect} from 'react-redux';
import * as orderActionCreators from 'store/actions/order';

const mapStateToProps = (state) => {
  return {
    languageId: state.app.languageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContactInfo: (field, value) => dispatch(orderActionCreators.setContactInfo(field, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
