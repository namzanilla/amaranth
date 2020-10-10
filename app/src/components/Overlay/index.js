import {connect} from 'react-redux';
import Overlay from './Overlay';
import * as overlayActionCreators from 'store/actions/overlay';

const mapStateToProps = (state) => {
  return {
    isVisible: state.overlay.isVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(overlayActionCreators.hide()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
