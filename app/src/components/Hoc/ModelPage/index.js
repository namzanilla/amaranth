import ModelPage from './ModelPage';
import {connect} from 'react-redux';
import * as appActionCreators from 'store/actions/app';
import * as modelActionCreators from 'store/actions/model';

const mapStateToProps = (state) => {
  const {
    app: {
      ssr,
      languageId,
    } = {},
    model: {
      id: modelId,
      info: {
        title,
        h1,
      } = {},
    } = {},
  } = state;

  return {
    ssr,
    title,
    h1,
    modelId,
    languageId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  appSetSSR: (bool) => dispatch(appActionCreators.setSSR(bool)),
  setModelIdByPathname: (pathname) => dispatch(modelActionCreators.setModelIdByPathname(pathname)),
  setModelInitialState: () => dispatch(modelActionCreators.setModelInitialState()),
  fetchModelById: (modelId) => dispatch(modelActionCreators.fetchModelById(modelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage);
