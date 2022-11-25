import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createAlbum} from "../../http/photoAPI";

const CreateAlbum = ({show, onHide}) => {
    const [value, setValue] = useState('');
    const addAlbum = () => {
        createAlbum({name: value}).then(() => {
            setValue('')
            onHide();
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавить новый альбом
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название альбома..."
                        onChange={e => setValue(e.target.value)}
                        value={value}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAlbum}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAlbum;
