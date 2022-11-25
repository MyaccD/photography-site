import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import {SERVICE_ROUTE} from "../utils/consts";

const ServiceItem = ({service}) => {
    const history = useHistory();
    console.log(service);
    return (
        <Col md={4} onClick={() => history.push(SERVICE_ROUTE + '/' + service.id)}>
            <Card style={{marginTop: 15, cursor: 'pointer', background: "#212529", borderRadius: 15}} border={"light"}>
                <Image style={{borderTopRightRadius: 15, borderTopLeftRadius: 15}}  src={process.env.REACT_APP_API_URL + service.img}/>
                <div style={{marginLeft: 16, marginTop: 16, color: "white", fontWeight: "bold", fontSize: 18}}>
                    {service.name}
                </div>
                <div style={{marginLeft: 16, marginBottom: 16, marginTop: 5, color: "white"}}>
                    {service.price}
                </div>
            </Card>
        </Col>
    );
};

export default ServiceItem;
