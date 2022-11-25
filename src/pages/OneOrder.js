import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getOneOrderServices} from "../http/ordersAPI";

const OneOrder = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderServices(id).then(data => {
            setOrder(data);
            setLoading(false);
            console.log(order);
        })
    }, []);

    if(loading) {
        return <Spinner animation="grow"/>
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("ru", options);
    }

    return (
        <Container className="d-flex flex-column">
            Заявка id: {id} <br />
            Статус: {order?.descr.complete ? "Выполнено" : "В процессе"} <br />
            Получено: {formatDate(order?.descr.createdAt)} <br />
            {order?.descr.complete ? formatDate(order.descr.complete.updatedAt) : false }
            <a href={`name:${order?.descr.name}`}>Имя: {order?.descr.name}</a>
            <a href={`tel:${order?.descr.mobile}`}>Телефон: {order?.descr.mobile}</a>
            <a href={`email:${order?.descr.email}`}>Email: {order?.descr.email}</a>
            <a href={`desription:${order?.descr.description}`}>Описание: {order?.descr.description}</a>
            <br />

            {order?.services.map( ({count,descr}, i) => {
                return (
                    <Row key={i} className="mb-5">
                        <Col xs={2}>
                            <Image width={150} src={process.env.REACT_APP_API_URL + descr.img}/>
                        </Col>
                        <Col xs={10}>
                            Тип услуги: {descr.type.name}<br />
                            Название: {descr.name}<br />
                            Цена: {descr.price} РУБ<br />
                        </Col>
                    </Row>
                )
            })}

        </Container>
    );
};

export default OneOrder;
