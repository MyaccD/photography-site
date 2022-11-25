import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ServiceList from "../components/ServiceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchService, fetchTypes} from "../http/serviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {service} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => service.setTypes(data));
        fetchService(null, 1, 3).then(data => {
            service.setServices(data.rows);
            service.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(service.selectedType === "all") {
                    fetchService(service.selectedType.id, service.page, 9).then(data => {
                        service.setServices(data.rows);
                        service.setTotalCount(data.count);
                    });
                } else {
                    fetchService(service.selectedType.id, service.page, 3).then(data => {
                        service.setServices(data.rows);
                        service.setTotalCount(data.count);
                    });
                }
        }, [service.page, service.selectedType]);

    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <TypeBar/>
                </Col>
                <Col md={10}>
                    <ServiceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
