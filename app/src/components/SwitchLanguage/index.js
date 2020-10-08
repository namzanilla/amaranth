import SwitchLanguage from './SwitchLanguage';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {
    app: {
      alternateUk,
      alternateRu,
      languageId,
    } = {},
  } = state;

  return {
    languageId,
    alternateUk,
    alternateRu,
  };
};

export default connect(mapStateToProps)(SwitchLanguage);
