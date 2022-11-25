import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {addServiceToBasket, fetchOneService} from "../http/serviceAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const ServicePage = observer(() => {
    const {user, basket} = useContext(Context);
    const [service, setService] = useState({info: []});
    const {id} = useParams();

    useEffect( () => {
        fetchOneService(id).then(data => setService(data));
    },[id]);

    const isServiceInBasket = () => {
        const findService = basket.Basket.findIndex(item => Number(item.id) === Number(service.id));
        return findService < 0;
    }

    const addServiceInBasket = (service) => {
        if(user.isAuth) {
            addServiceToBasket(service).then(() => basket.setBasket(service, true))
        } else {
            basket.setBasket(service);
        }
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Image width={500} src={process.env.REACT_APP_API_URL + service.img}/>
                </Col>
                <Col md={6}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{fontSize: 43, fontWeight: 400}}>{service.name}</h2>
                    </Row>
                    <Row className="d-flex flex-column align-items-center">
                        <h3 style={{fontSize: 20, fontWeight: 300, width: 400, textAlign: "center"}}>{service.description}</h3>
                    </Row>
                    <br></br>
                    <Row className="d-flex flex-column align-items-center">
                        <h3>{service?.price || 0} РУБ</h3>
                        { isServiceInBasket() ?
                            <Button variant="outline-dark" onClick={() => addServiceInBasket(service)}>Добавить услугу в корзину</Button>
                            :
                            <Button variant="outline-dark" disabled>Услуга уже добавлена</Button>
                        }
                    </Row>
                    <br></br>
                    <Row className="d-flex flex-column m-3">
                        {service.info.map( (info, index) =>
                            <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default ServicePage;