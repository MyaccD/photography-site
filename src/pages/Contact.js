import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import photographer from "../assets/photographer.jpg"
import phones from "../assets/phones.png";


const Contact = () => {
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
            <Row>
            <Col md={6}>
            <Row className="d-flex flex-column align-items-center">
            <div style={{marginTop: 30}}>
                <h1>Хотите съемку?</h1>
                <h2 style={{width: 330, fontSize: 20, fontWeight: 300}}>Оставьте заявку и я свяжусь с вами в ближайщее время.</h2>
            </div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="name" placeholder="Введите имя" value={name} onChange={e => setName(e.target.value)}style={{ marginTop: 20,width: 350}} />
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
                        <Form.Control type="email" placeholder="Почтовый адрес или ссылка на соц.сеть" value={email} onChange={e => setEmail(e.target.value)}style={{ width: 350}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} placeholder="Ваши пожелания" value={description} onChange={e => setDescription(e.target.value)} style={{ width: 350}} />
                    </Form.Group>
                </Form>

            <Row className="mt-3">
                <Col xs={12}>
                    <Button variant="success" onClick={buy}>Отправить</Button>
                </Col>
            </Row>

                <div style={{marginTop: 20}}>
                    <Button href="https://vk.com/dinyyyaa" target="_blank" variant="primary">VK</Button>{''}
                    <Button style={{marginLeft: 10}}variant="danger">Instagram</Button>{''}
                    <Button href="https://t-do.ru/dinyyyaa" target="_blank" style={{marginLeft: 10}}variant="info">Telegram</Button>{''}
                    
                    <Button href="tel: +7(913)879-61-00" style={{marginLeft: 10}}variant="warning">
                        <Image src={phones} style={{width: "70%", maxWidth: 30}} alt="phone"/>
                        <div className="ml-2" style={{textDecoration: "none", color: "black"}}></div>
                    </Button>
                </div>
            </Row>
            </Col>

            <Col md={6}>
            <Row className="d-flex flex-column align-items-center">
                <div style={{width: "60%", marginTop: '30px', borderRadius: '15px'}} class="card">
                <Image src={photographer} style={{width: "100%", borderTopRightRadius: 15, borderTopLeftRadius: 15}} />
                    <div class="container">
                        <h2 style={{marginTop: "10px"}}>Фотограф</h2>
                        <p>photograph@example.com</p>
                        <p>+7913-999-6666</p>
                    </div>
                </div>
            </Row>
            </Col>
            </Row>
        </Container>

    );
};

export default Contact;