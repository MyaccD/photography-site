import React, {useContext, useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";

const Ordering = () => {
    const {basket, user} = useContext(Context);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);

    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const buy = () => {
        let order = {
            name: name,
            mobile: phone,
            email: email,
            description: description,
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            basket.setDeleteAllServiceFromBasket();
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }
    return (
        <Container className="mt-3">
            {showMsg && <Row className='d-flex, align-items-center justify-content-center'><div style={{background: '#28a745', marginLeft: 15, borderRadius: 5, color: 'white', padding: 6}}>
                {msg}
            </div>
            </Row>}

            <h1 style={{marginTop:10}}>Оформление заявки</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="name" placeholder="Введите имя" value={name} onChange={e => setName(e.target.value)} style={{ marginTop: 20,width: 350}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="phone"
                        placeholder="Номер телефона"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        style={{ width: 350}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Почтовый адрес или ссылка на соц.сеть" value={email} onChange={e => setEmail(e.target.value)} style={{ width: 350}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={3} placeholder="Ваши пожелания" value={description} onChange={e => setDescription(e.target.value)}style={{ width: 350}} />
                </Form.Group>
            </Form>
            <Row className="mt-3">
                <Col xs={12}>
                    <Button variant="success" onClick={buy}>Отправить</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Ordering;


