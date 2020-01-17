import { createStore } from "redux";
import { connect } from "react-redux";
import { startAction } from "./actions/startAction";
import { stopAction } from "./actions/stopAction";
import rotateReducer from "reducers/rotateReducer";

function configureStore(state = { rotating: true }) {
    return createStore(rotateReducer,state);
}

export default connect()(App);
export default configureStore;