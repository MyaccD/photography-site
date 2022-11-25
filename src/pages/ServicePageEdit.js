import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useHistory} from 'react-router-dom';
import {fetchDeleteService, fetchOneService, updateServices} from "../http/serviceAPI";
import {Context} from "../index";
import {ADMIN_SERVICE_ROUTE} from "../utils/consts";

const ServicePageEdit = () => {
    const {service} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();
    const [serviceCurr, setServiceCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteService = () => {
        fetchDeleteService(id).then(() => {
            history.push(ADMIN_SERVICE_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putService = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateServices(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if(serviceCurr.info && serviceCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if(serviceCurr && serviceCurr.type) {
            if(serviceCurr.type.name !== selectType.name ||
                serviceCurr.name !== name ||
                serviceCurr.description !== description ||
                serviceCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, description, selectType, price, img, info]);

    useEffect(() => {
        fetchOneService(id).then(data => {
            setServiceCurr(data);
            setSelectType(data.type);
            setName(data.name);
            setDescription(data.description)
            setPrice(data.price);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            {showMsg && <Row className='d-flex, align-items-center justify-content-center'><div style={{background: '#28a745', marginLeft: 15, borderRadius: 5, color: 'white', padding: 6}}>
                {msg}
            </div>
            </Row>}

            <Row className='mt-3'>
                <Col xs={12}>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            id:
                        </Col>
                        <Col xs={11}>
                            {serviceCurr.id}
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Тип:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectType.name || "Выберите тип"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {service.types.map(type => {
                                        return type.name === selectType.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Название:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{color: "red"}}>Заполните поле</b>}
                        </Col>
                    </Row>
                    {/*Description*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Описание:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {description.length === 0 && <b style={{color: "red"}}>Заполните поле</b>}
                        </Col>
                    </Row>
                    {/*Price*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center">
                            Цена:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={2} className="d-flex align-items-center">
                            {price === 0 && <b style={{color: "red"}}>Заполните поле</b>}
                        </Col>
                    </Row>

                    {/*Img*/}
                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center">
                            Текущее изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={process.env.REACT_APP_API_URL + serviceCurr.img}/>
                        </Col>
                        {img && <Col xs={6} className="d-flex flex-column justify-content-center text-center">
                            Новое изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={img}/>
                        </Col>}
                        <Col xs={3} className="d-flex align-items-center">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Загрузить файл" onChange={imgHandler}/>
                                </Form.Group>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/*Characteristics*/}
                    <Row className="d-flex flex-column m-3">
                        <Button
                            variant="outline-dark"
                            onClick={() => addInfo()}
                        >
                            Добавить новое поле
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите заголовок..."
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title &&  <b style={{color: "red"}}>Заполните поле</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание..."
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description &&  <b style={{color: "red"}}>Заполните поле</b>}
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteInfo(item.number)}
                                    >
                                        Удалить поле
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить услугу</Button> : <Button onClick={putService}>Обновить услугу</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить услугу</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить услугу {serviceCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={deleteService}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ServicePageEdit;

