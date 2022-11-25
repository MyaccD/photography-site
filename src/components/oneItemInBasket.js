import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";

const OneItemInBasket = ({service}) => {
    const {basket, user} = useContext(Context);

    return (
        <Card key={service.id} style={{width: "100%"}} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <Image src={process.env.REACT_APP_API_URL + service.img} style={{width: "100%", maxWidth: 250}} />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12}>
                                <b>Название:</b> <NavLink to={`/service/${service.id}`}>{service.name}</NavLink>
                            </Col>
                            <br/><br/>
                            <Col xs={12}>
                                <b>Описание: </b>{service.description}
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col xs={12}>
                                <b>Подробности:</b><br/><br/>
                                {service.info && service.info.length !== 0? service.info.map((info, i) => {

                                    if(i % 2 === 0 ) {
                                        return (
                                            <Row key={info.id}>
                                                <Col xs={6}>
                                                    {info.title}:
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{backgroundColor: "lightgray"}}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Описание отсутствует"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(service, true)}>Удалить из корзины</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(service)}>Удалить из корзины</Button>
                                }
                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Цена: {service.price * service.count} РУБ
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
)};

export default OneItemInBasket;
