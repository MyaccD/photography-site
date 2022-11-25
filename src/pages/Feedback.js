import React, {useEffect, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {
    Button,
    Col,
    Container,
    Image,
    ListGroup,
    Row
} from "react-bootstrap";

import CreateFeedback from "../components/modals/CreateFeedback";
import {fetchFeedback} from "../http/feedbackAPI";

const Feedback = observer(() => {
    const {feedback} = useContext(Context);
    const [feedbackVisible, setFeedbackVisible] = useState(false);

    useEffect(() => {
        fetchFeedback().then(data => {
            feedback.setFeedbacks(data.rows);
        });
    }, []);

    useEffect(() => {
        fetchFeedback().then(data => {
            feedback.setFeedbacks(data.rows);           
        });
        }, [feedback]);

    return (
        <Container className="d-flex flex-column mt-3">
            <Row>
                <Col xs={12} className="d-flex justify-content-center align-items-center">
                        <Button
                            onClick={() => setFeedbackVisible(true)}
                            variant="outline-dark"
                            className="mt-2 p-2"

                        >
                        Оставить отзыв
                        </Button>
                        <CreateFeedback show={feedbackVisible} onHide={() => setFeedbackVisible(false)}/>
                  
                </Col>
                <Col md={12}>
                    <ListGroup>
                        {feedback.feedbacks.map(feedback => 
                            <ListGroup.Item className="mt-3" key={feedback.id}>
                                <Row>
                                    <Col xs={2}>
                                        <Image width={140} style={{borderRadius: "90px"}} src={process.env.REACT_APP_API_URL + feedback.img}/>
                                    </Col>
                                    <Col xs={10}>
                                
                                        <Row>
                                            <Col xs={12}>
                                                Имя: {feedback.name}
                                            </Col>
                                        </Row>
                                         <Row>
                                            <Col xs={12}>
                                                Отзыв: {feedback.description}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
});

export default Feedback;
