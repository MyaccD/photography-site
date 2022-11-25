 import React, {useEffect, useState} from 'react';
 import {Button, Dropdown, Modal} from "react-bootstrap";
 import {deleteType, fetchTypes} from "../../http/serviceAPI";

 const DeleteType = ({show, onHide, showSuccessMsgFunc}) => {
    const [Type, setType] = useState("Тип");
    const [types, setTypes] = useState([]);
    const [selectType, setSelectType] = useState({name: "Тип не выбран"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
         fetchTypes().then(data => setTypes(data));
     }, []);

     const Delete = async () => {
         if(Type === "Тип") {
             if(selectType.name !== "Тип не выбран") {
                 await deleteType(selectType.id).then(data => {
                     showSuccessMsgFunc(data);
                     onHide();
                     setSelectType({name: "Тип не выбран"});
                 });
             } else {
                 setMsgErr("Выберите тип");
                 setShowMsgErr(true);
             }
         }
     };

    useEffect(() => setShowMsgErr(false), [selectType, Type])

     return (
         <Modal
             show={show}
             onHide={onHide}
             size="lg"
             centered
         >
             <Modal.Header closeButton>
                 <Modal.Title>
                    Удаление типа услуги
                 </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 {showMsgErr &&
                     <>
                         <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                     </>
                 }

                 Выберите тип {Type ===  "Тип"}
                 <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                     <Dropdown.Toggle variant="success" id="dropdown-basic">
                         {Type}
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                         {Type === "Тип"}
                         {
                             types.map(({id, name}) =>
                                 selectType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectType({id, name})}>{name}</Dropdown.Item>
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

 export default DeleteType;
