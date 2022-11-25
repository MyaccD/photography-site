import React, {useContext, useEffect} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import AlbumBar from "../components/AlbumBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchPhoto, fetchAlbums} from "../http/photoAPI";
import Masonry from "react-masonry-css";
import './PhotoPage.css'
import { SRLWrapper} from "simple-react-lightbox";

const PhotoPage = observer(() => {
    const {photo} = useContext(Context);

    useEffect(() => {
        fetchAlbums().then(data => photo.setAlbums(data));
        fetchPhoto(null, 1, 100).then(data => {
            photo.setPhotos(data.rows);
            photo.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(photo.selectedAlbum === "all") {
                    fetchPhoto(photo.selectedAlbum.id, photo.page, ).then(data => {
                        photo.setPhotos(data.rows);
                        photo.setTotalCount(data.count);
                    });
                } else {
                    fetchPhoto(photo.selectedAlbum.id, photo.page, ).then(data => {
                        photo.setPhotos(data.rows);
                        photo.setTotalCount(data.count);
                    });
                }
        }, [photo.page, photo.selectedAlbum]);

        const breakpoints = {
            default: 4,
            1100: 2,
            700: 1
        }

    return (
        <Container>
            <Row className="mt-3">
        
                 <Col md={12}> 
                 <Row className="d-flex flex-column align-items-center">
                 <AlbumBar/> 
                 </Row>
                 </Col> 
          
            <SRLWrapper>
                <div className='containter_'>
                <Masonry
                        breakpointCols={breakpoints}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                    {photo.photos.map(photo =>
                        <div key={photo.id}> 
                            <img className='image_' photo={photo} src={process.env.REACT_APP_API_URL + photo.img}/>
                        </div>
                    )}
                </Masonry>
                </div>
            </SRLWrapper>
            </Row>
        </Container>
    );
});

export default PhotoPage;
