import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {Context} from "../../index";
import {Container, Navbar} from "react-bootstrap";
import {CONTACT_ROUTE, HOME_ROUTE, PHOTO_ROUTE, SHOP_ROUTE, FEEDBACK_ROUTE} from "../../utils/consts";
import TrueAuth from "./preesent-components/trueAuth";
import FalseAuth from "./preesent-components/falseAuth";

const NavBar = observer(() => {
    const {user} = useContext(Context);

    return (
        <Navbar style={{background: '#212529'}}>
            <Container>
                <NavLink style={{color: "white"}} to={HOME_ROUTE}>Главная</NavLink>
                <NavLink style={{color: "white", marginLeft: 10}} to={PHOTO_ROUTE}>Портфолио</NavLink>
                <NavLink style={{color: "white", marginLeft: 10}} to={SHOP_ROUTE}>Услуги и цены</NavLink>
                <NavLink style={{color: "white", marginLeft: 10}} to={CONTACT_ROUTE}>Контакты</NavLink>
                <NavLink style={{color: "white", marginLeft: 10}} to={FEEDBACK_ROUTE}>Отзывы</NavLink>
                {user.isAuth ? <TrueAuth/> : <FalseAuth/>}
            </Container>
        </Navbar>
    );
});

export default NavBar;
