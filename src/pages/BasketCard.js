import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Col, Image, Row} from "react-bootstrap";
import OneItemInBasket from "../components/oneItemInBasket";
import emptyBasket from "./../assets/emptyBasket.jpg";
import {ORDERING_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
const BasketCard = observer(() => {
    const {basket} = useContext(Context);

    if(basket.Basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <Image src={emptyBasket}/>
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Корзина пуста</b></div>
            </div>
        )
    }

    return (
        <>
            <br/>
            <NavLink to={ORDERING_ROUTE}>
                <Button>Отправить заявку</Button>
            </NavLink>
            <Row className="mt-3">
                <Col xs={12}>
                    {basket.Basket.map(service => <OneItemInBasket key={service.id} service={service}/>)}
                </Col>
            </Row>
        </>
    );
});

export default BasketCard;
