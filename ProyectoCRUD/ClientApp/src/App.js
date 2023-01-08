
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from 'reactstrap'
import ModalContact from './componentes/ModalContacto';
import TablaContacto from './componentes/TablaContacto'

const App = () => {

    

    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/Lista");
        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        } else {
            console.log("error en la lista");
        }
    }

    useEffect(() => {
        
        setTimeout(() => {
            mostrarContactos();
        }, 2000);
    },[])

    const guardarContacto = async(contacto) => {
        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }


    return (
        <Container >
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>

                            <h5>Lista de Contactos</h5>

                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={ () => setMostrarModal(!mostrarModal) }>
                               Nuevo Contacto
                            </Button>
                            <TablaContacto data={contactos} />
                        </CardBody>
                    </Card>
                </Col>
                    
            </Row>

            <ModalContact mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
            />
        </Container>
                
        )
}

export default App;