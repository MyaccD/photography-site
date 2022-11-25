import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ServiceStore from "./store/ServiceStore";
import PhotoStore from "./store/PhotoStore"
import BasketStoreStore from "./store/BasketStore";
import SimpleReactLightbox from "simple-react-lightbox";
import FeedbackStore from './store/FeedbackStore';

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            service: new ServiceStore(),
            photo: new PhotoStore(),
            basket: new BasketStoreStore(),
            feedback: new FeedbackStore(),
        }
    }>
        <SimpleReactLightbox>
            <App/>
        </SimpleReactLightbox>
    </Context.Provider>,
    document.getElementById('root')
);
