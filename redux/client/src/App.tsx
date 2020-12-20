import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./modules/index";
import Counter from "./components/Counter";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
