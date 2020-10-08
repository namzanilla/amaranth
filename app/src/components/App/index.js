import {connect} from 'react-redux';
import App from './App';
import * as appActionCreators from 'store/actions/app';

const mapStateToProps = (state) => {
  const {
    app: {
      loading,
      hoc,
      languageId,
      alternateUk,
      alternateRu,
    } = {},
  } = state;

  return {
    loading,
    hoc,
    alternateUk,
    languageId,
    alternateRu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageId: (languageId) => dispatch(appActionCreators.setLanguageId(languageId)),
    setAlternate: (alternate) => dispatch(appActionCreators.setAlternate(alternate)),
    setHoc: (hoc) => dispatch(appActionCreators.setHoc(hoc)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
