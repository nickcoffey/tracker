import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import Categories from './components/category/Categories'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Categories />
      </div>
    </Provider>
  )
}

export default App;
