import SwitchLanguage from './SwitchLanguage';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    languageId: state.app.languageId,
    alternateUk: state.app.alternateUk,
    alternateRu: state.app.alternateRu,
  };
};

export default connect(mapStateToProps)(SwitchLanguage);
