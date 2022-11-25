import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const AlbumBar = observer(() => {
    const {photo} = useContext(Context);

    const getAllPhotos = () => {
        photo.setSelectedAlbum("all");
    }

    return (
        <ListGroup horizontal>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === photo.selectedAlbum}
                onClick={getAllPhotos}
            >
                Все альбомы
            </ListGroup.Item>
            {photo.albums.map(album =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={album.id === photo.selectedAlbum.id}
                    key={album.id}
                    onClick={() => photo.setSelectedAlbum(album)}
                >
                    {album.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default AlbumBar;
