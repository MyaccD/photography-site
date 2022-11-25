import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {createPhoto, fetchAlbums} from "../../http/photoAPI";
import {observer} from "mobx-react-lite";

const CreatePhoto = observer(({show, onHide}) => {
    const {photo} = useContext(Context);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchAlbums().then(data => photo.setAlbums(data));
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addPhoto = () => {
        const formData = new FormData();
        formData.append('img', file);
        formData.append('albumId', photo.selectedAlbum.id);
        createPhoto(formData).then(() => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавить новое фото
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{photo.selectedAlbum.name || "Выберите альбом"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {photo.albums.map(album =>
                                <Dropdown.Item
                                    key={album.id}
                                    onClick={() => photo.setSelectedAlbum(album)}
                                >
                                    {album.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPhoto}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePhoto;
