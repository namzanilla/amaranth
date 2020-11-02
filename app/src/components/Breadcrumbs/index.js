import Breadcrumbs from './Breadcrumbs';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    list: state.breadcrumbs.list,
  };
};

export default connect(mapStateToProps)(Breadcrumbs);
