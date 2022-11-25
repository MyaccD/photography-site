import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {
    Button,
    Col,
    Container,
    Dropdown,
    Image,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreatePhoto from "../components/modals/CreatePhoto";
import CreateAlbum from "../components/modals/CreateAlbum";
import {getAllPhotosInAdminPage} from "../http/photoAPI";
import {NavLink} from "react-router-dom";
import {PHOTO_EDIT_ROUTE, ADMIN_SERVICE_ROUTE} from "../utils/consts";
import DeleteAlbum from "../components/modals/DeleteAlbum";

const AdminPhoto = () => {
    const history = useHistory();
    const [albumVisible, setAlbumVisible] = useState(false);
    const [photoVisible, setPhotoVisible] = useState(false);
    const [deleteAlbum, setDeleteAlbum] = useState(false);
    const [searchPhoto, setSearchPhoto] = useState('');
    const [searchedPhoto, setSearchedPhoto] = useState([]);
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
        getAllPhotosInAdminPage(searchPhoto, currentPage, filter).then(({count, rows}) => {
            setSearchedPhoto(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllPhotosInAdminPage(searchPhoto, 1, filter).then(({count, rows}) => {
            setSearchedPhoto(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])

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
                    onClick={() => {history.push(ADMIN_SERVICE_ROUTE)}}
                    style={{width: '400px'}}
                >
                Открыть панель редактирования услуг
                </Button>
            </Row>

            <Row>
                <Col md={2} xs={6}>
                        <Button
                            onClick={() => setAlbumVisible(true)}
                            variant="outline-success"
                            className="mt-3 p-2"
                            >
                            Добавить альбом
                        </Button>
                        <Button
                            onClick={() => setDeleteAlbum(true)}
                            variant="outline-danger"
                            className="mt-2 p-2"
                        >
                            Удалить альбом
                        </Button>
                        <Button
                            onClick={() => setPhotoVisible(true)}
                            variant="outline-dark"
                            className="mt-2 p-2"

                        >
                        Добавить фото
                        </Button>
                        <CreatePhoto show={photoVisible} onHide={() => setPhotoVisible(false)}/>
                        <CreateAlbum show={albumVisible} onHide={() => setAlbumVisible(false)}/>
                        <DeleteAlbum show={deleteAlbum} onHide={() => setDeleteAlbum(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>
                </Col>
                <Col md={10}>
                    <Dropdown className="mt-3 mb-3" style={{margin: "0 auto"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {filter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {filter === "Все" ? <Dropdown.Item disabled>Все</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Все")}>Все</Dropdown.Item>}
                            {filter === "Без альбома" ? <Dropdown.Item disabled>Без альбома</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Без альбома")}>Без альбома</Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown>

                
                    <ListGroup>
                        {searchedPhoto && searchedPhoto.map( ({id, img, album}) => {
                            return (
                                <ListGroup.Item className="mt-3" key={id}>
                                    <Row>
                                        <Col md={2} sm={2}>
                                            <Image width={140} src={process.env.REACT_APP_API_URL + img}/>
                                        </Col>
                                        <Col md={8} sm={8}>
                                            <Row>
                                                <Col md={8} sm={8}>
                                                    <NavLink to={PHOTO_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col xs={12}>
                                                    Альбом: {album.name}
                                                </Col>
                                            </Row> */}
                                        </Col>
                                        <Col md={2} sm={2}>
                                            <NavLink to={PHOTO_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                        {searchedPhoto && searchedPhoto.length > 0 ? pages : false}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPhoto;
