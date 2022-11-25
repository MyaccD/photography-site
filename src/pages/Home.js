import React from 'react';
import home from "../assets/home.jpeg";
import home2 from "../assets/home2.jpeg";
import home3 from "../assets/home3.jpeg";
import phones from "../assets/phones.png";
import {Button, Carousel, Image} from "react-bootstrap";

const Home = () => {
    return (

            <div className="container">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 style={{color: 'white', textShadow: 'black 2px 0px'}}>Автомобильная съемка</h3>
                            <p style={{color: 'white', textShadow: 'black 2px 0px'}}>Съемка вашего автомобиля на пленку/цифру</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h3 style={{color: 'white', textShadow: 'black 2px 0px'}}>Предметная съемка</h3>
                        <p style={{color: 'white', textShadow: 'black 2px 0px'}}>Рекламная съемка для вашего бизнеса</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3 style={{color: 'white', textShadow: 'black 2px 0px'}}>Люди</h3>
                        <p style={{color: 'white', textShadow: 'black 2px 0px'}}>Проголучная, студийная и другие виды съемок</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div style={{marginLeft: 22}}>
                    <Button variant="primary">VK</Button>{''}
                    <Button style={{marginLeft: 10}}variant="danger">Instagram</Button>{''}
                    <Button style={{marginLeft: 10}}variant="info">Telegram</Button>{''}
                    <Button  style={{marginLeft: 10}}variant="warning">
                        <Image src={phones} style={{width: "70%", maxWidth: 30}} alt="phone"/>
                        <div className="ml-2" style={{textDecoration: "none", color: "black"}}></div>
                    </Button>
                </div> 
            </div>
    );
};

export default Home;