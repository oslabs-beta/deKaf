import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
// @ts-ignore
import BrokerOverview from './BrokerOverview.tsx';
// @ts-ignore
import BrokerDetails from './BrokerDetails.tsx';

const Gallery = () => {
  return (
    <div className='gallery'>
      <Switch>
        <Route path='/details' render={() => <BrokerDetails />} />
        <Route path='/user' render={() => <BrokerOverview />} />
      </Switch>
    </div>
  )
}

export default Gallery;