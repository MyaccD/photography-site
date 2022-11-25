import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {Container, Spinner} from "react-bootstrap";
import {Context} from "./index";
import {check} from "./http/userApi";
import {getServiceFromBasket} from "./http/serviceAPI";

const App = observer(() => {
    const {user, basket} = useContext(Context);
    const [loading, setLoading] = useState(false);
    //проверка авторизации
    useEffect(() => {
        if(localStorage.getItem('token')) {
            setLoading(true);
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [user]);
    //загрузка корзины
    useEffect(() => {
       if(user.isAuth === false) {
           basket.setDeleteAllServiceFromBasket();
           const savedBasket = JSON.parse(localStorage.getItem("basket"));
           for (let key in savedBasket) {
               basket.setBasket(savedBasket[key]);
           }
       } else if(user.isAuth === true){
           basket.setDeleteAllServiceFromBasket();
           getServiceFromBasket().then(data => {
               for (let key in data) {
                   basket.setBasket(data[key], true);
               }
           })
       }
    }, [basket, user.isAuth]);

    if(loading) {
        return <Spinner animation="grow"/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <Container>
                <AppRouter/>
            </Container>
        </BrowserRouter>
    );
});
export default App;
