import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {service} = useContext(Context);

    const getAllServices = () => {
        service.setSelectedType("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer", marginTop: 15}}
                active={"all" === service.selectedType}
                onClick={getAllServices}
            >
                Все услуги
            </ListGroup.Item>
            {service.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === service.selectedType.id}
                    key={type.id}
                    onClick={() => service.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
