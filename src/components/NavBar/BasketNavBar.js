import React, {useContext} from 'react';
import {Button, Image} from "react-bootstrap";
import shop_cart from "../../assets/shopping-baskett.png";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE} from "../../utils/consts";
import {useHistory} from 'react-router-dom';

const BasketNavBar = observer(() => {
    const {basket} = useContext(Context);
    const history = useHistory();

    return (
            <Button  variant="light" className="d-flex align-items-center mr-3" onClick={() => history.push(BASKET_ROUTE)}>
                    <Image src={shop_cart} style={{width: "100%", maxWidth: 30}} alt="basket"/>
                    <div className="ml-2" style={{textDecoration: "none", color: "black"}}>{basket.Price} РУБ</div>
            </Button>
    );
});
export default BasketNavBar;


