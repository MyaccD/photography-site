import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createFeedback} from "../../http/feedbackAPI";
import {observer} from "mobx-react-lite";

const CreateFeedback = observer(({show, onHide}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addFeedback = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('img', file);
        createFeedback(formData).then(() => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Новый отзыв
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form > 
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        
                        placeholder="Ваше имя..."
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Ваш отзыв ..."
                        as="textarea"
                    />
                    <Form.Group controlId="formFile"  className="mt-3">
                    <Form.Label>Выбрать фото</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={selectFile}
                    />
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addFeedback}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateFeedback;
