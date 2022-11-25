import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreateService from "../components/modals/CreateService";
import CreateType from "../components/modals/CreateType";
import {getAllServicesInAdminPage} from "../http/serviceAPI";
import {NavLink} from "react-router-dom";
import {SERVICE_EDIT_ROUTE, ADMIN_PHOTO_ROUTE} from "../utils/consts";
import DeleteType from "../components/modals/DeleteType";

const AdminService = () => {
    const history = useHistory();
    const [typeVisible, setTypeVisible] = useState(false);
    const [serviceVisible, setServiceVisible] = useState(false);
    const [deleteType, setDeleteType] = useState(false);
    const [searchService, setSearchService] = useState('');
    const [searchedService, setSearchedService] = useState([]);
    const [filter, setFilter] = useState("Все");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);
    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);


    //pagination
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        getAllServicesInAdminPage(searchService, currentPage, filter).then(({count, rows}) => {
            setSearchedService(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllServicesInAdminPage(searchService, 1, filter).then(({count, rows}) => {
            setSearchedService(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchService = () => {
        getAllServicesInAdminPage(searchService, currentPage, filter).then(({count, rows}) => {
            setSearchedService(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex flex-column mt-3">
            {showSuccessMsg && <Row className='d-flex, align-items-center justify-content-center'><div style={{background: '#28a745', marginLeft: 15, marginBottom: 15, borderRadius: 5, color: 'white', padding: 6}}>
                {successMsg}
            </div>
            </Row>}

            <Row className='d-flex, align-items-center justify-content-center'>
                <Button
                    className={"mr-3"}
                    variant={"dark"}
                    onClick={() => {history.push(ADMIN_PHOTO_ROUTE)}}
                    style={{width: '400px'}}
                >
                Открыть панель редактирования фотографий
                </Button>
            </Row>
            

            <Row>
                <Col md={2}>
                        <Button
                            onClick={() => setTypeVisible(true)}
                            variant="outline-success"
                            className="mt-3 p-2"
                            >
                            Добавить тип
                        </Button>
                        <Button
                            onClick={() => setDeleteType(true)}
                            variant="outline-danger"
                            className="mt-2 p-2"
                        >
                            Удалить тип
                        </Button>
                        <Button
                            onClick={() => setServiceVisible(true)}
                            variant="outline-dark"
                            className="mt-2 p-2"

                        >
                        Добавить услугу
                        </Button>
                        <CreateService show={serviceVisible} onHide={() => setServiceVisible(false)}/>
                        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                        <DeleteType show={deleteType} onHide={() => setDeleteType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>
                </Col>
                <Col md={10}>
                    <Dropdown className="mt-3 mb-3" style={{margin: "0 auto"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {filter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {filter === "Все" ? <Dropdown.Item disabled>Все</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Все")}>Все</Dropdown.Item>}
                            {filter === "Без типа" ? <Dropdown.Item disabled>Без типа</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Без типа")}>Без типа</Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown>

                    

                    <InputGroup className="mb-3" >
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            value={searchService}
                            onChange={e => setSearchService(e.target.value)}
                            placeholder="Введите название услуги..."
                        />
                        <Button
                            onClick={fetchService}
                            variant="outline-dark"
                            className="ml-2"
                        >
                            Поиск
                        </Button>
                    </InputGroup>

                    <ListGroup>
                        {searchedService && searchedService.map( ({id, img, type, price, name}) => {
                            return (
                                <ListGroup.Item className="mt-3" key={id}>
                                    <Row>
                                        <Col xs={2}>
                                            <Image width={140} src={process.env.REACT_APP_API_URL + img}/>
                                        </Col>
                                        <Col xs={8}>
                                            <Row>
                                                <Col xs={12}>
                                                    <NavLink to={SERVICE_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Название: {name}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Цена: {price}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    Тип: {type.name || "тип отсутствует"}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={2}>
                                            <NavLink to={SERVICE_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                        {searchedService && searchedService.length > 0 ? pages : false}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminService;
