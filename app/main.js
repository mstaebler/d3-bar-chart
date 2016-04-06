import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';

ReactDOM.render(
  <Layout source="https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"/>,
  document.getElementById('app')
);
