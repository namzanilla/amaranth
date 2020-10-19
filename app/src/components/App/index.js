import {connect} from 'react-redux';
import App from './App';
import * as appActionCreators from 'store/actions/app';

const mapStateToProps = (state) => {
  return {
    hoc: state.app.hoc,
    alternateUk: state.app.alternateUk,
    alternateRu: state.app.alternateRu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageId: (languageId) => dispatch(appActionCreators.setLanguageId(languageId)),
    setAlternate: (path, querystring) => dispatch(appActionCreators.setAlternate(path, querystring)),
    setHoc: (hoc) => dispatch(appActionCreators.setHoc(hoc)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
