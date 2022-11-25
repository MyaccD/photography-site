import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useHistory} from 'react-router-dom';
import {fetchDeletePhoto, fetchOnePhoto, updatePhotos} from "../http/photoAPI";
import {Context} from "../index";
 import {ADMIN_PHOTO_ROUTE} from "../utils/consts";

const PhotoPageEdit = () => {
    const {photo} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();
    const [photoCurr, setPhotoCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [selectAlbum, setSelectAlbum] = useState({});
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deletePhoto = () => {
        fetchDeletePhoto(id).then(() => {
            history.push(ADMIN_PHOTO_ROUTE);
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

    const putPhoto = () => {
        const formData = new FormData();
        formData.append('img', imgFile);
        formData.append('albumId', selectAlbum.id);
        updatePhotos(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    useEffect(() => {
        if(photoCurr && photoCurr.album) {
            if(photoCurr.album.name !== selectAlbum.name ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [img]);

    useEffect(() => {
        fetchOnePhoto(id).then(data => {
            setPhotoCurr(data);
            setSelectAlbum(data.album);
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
                            {photoCurr.id}
                        </Col>
                    </Row>
                    {/*Album*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Альбом:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectAlbum.name || "Выберите тип"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {photo.albums.map(album => {
                                        return album.name === selectAlbum.name ?
                                            <Dropdown.Item
                                                key={album.id}
                                                disabled
                                            >
                                                {album.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={album.id}
                                                onClick={() => setSelectAlbum(album)}
                                            >
                                                {album.name}
                                            </Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                
                    {/*Img*/}
                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center">
                            Текущее изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={process.env.REACT_APP_API_URL + photoCurr.img}/>
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

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить фото</Button> : <Button onClick={putPhoto}>Обновить фото</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить фото</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить фото {photoCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={deletePhoto}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PhotoPageEdit;

