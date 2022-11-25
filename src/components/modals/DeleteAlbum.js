import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteAlbum, fetchAlbums} from "../../http/photoAPI";

const DeleteAlbum = ({show, onHide, showSuccessMsgFunc}) => {
   const [Album, setAlbum] = useState("Альбом");
   const [albums, setAlbums] = useState([]);
   const [selectAlbum, setSelectAlbum] = useState({name: "Альбом не выбран"});
   const [showMsgErr, setShowMsgErr] = useState(false);
   const [msgErr, setMsgErr] = useState('');

   useEffect(() => {
        fetchAlbums().then(data => setAlbums(data));
    }, []);

    const Delete = async () => {
        if(Album === "Альбом") {
            if(selectAlbum.name !== "Альбом не выбран") {
                await deleteAlbum(selectAlbum.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectAlbum({name: "Альбом не выбран"});
                });
            } else {
                setMsgErr("Выберите альбом");
                setShowMsgErr(true);
            }
        }
    };

   useEffect(() => setShowMsgErr(false), [selectAlbum, Album])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                   Удаление альбома
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Выберите альбом {Album ===  "Альбом"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {Album}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {Album === "Альбом"}
                        {
                            albums.map(({id, name}) =>
                                selectAlbum.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectAlbum({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={Delete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAlbum;
