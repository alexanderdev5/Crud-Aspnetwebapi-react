
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from 'reactstrap'
import TablaContacto from './componentes/TablaContacto'

const App = () => {

    const [contactos, setContactos] = useState([]);

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
        }, 5000);
    },[])



    return (
        <Container >
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>

                            <h5>Lista de Contactos</h5>

                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color ="success">
                               Nuevo Contacto
                            </Button>
                            <TablaContacto data={contactos} />
                        </CardBody>
                    </Card>
                </Col>
                    
            </Row>
        </Container>
                
        )
}

export default App;