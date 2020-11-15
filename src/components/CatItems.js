import React, { Component } from 'react';
import {
    Accordion,
    Button,
    Card,
    Container,
    Row,
    Col,
  } from 'react-bootstrap';

export default class CatItems extends Component {
    render() {
        const { name, origin, description, temperament } = this.props.cats
        return (
            <>
                <Container className='mb-2'>
                    <Accordion defaultActiveKey='1'>
                        <Card border="info">
                            <Card.Header>
                                <Row>
                                    <Col sm={10}>
                                        <Card.Title>{name}</Card.Title>
                                    </Col>
                                    <Col sm={2}>
                                        <Accordion.Toggle as={Button} variant="info" eventKey='0'>
                                            Detail
                                </Accordion.Toggle>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Accordion.Collapse eventKey='0'>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted"><i>Country : </i>{origin}</Card.Subtitle>
                                    <Card.Text>
                                        {description}
                                    </Card.Text>
                                    <Card.Text className="font-weight-bold">
                                        Temprament : {temperament}
                                    </Card.Text>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Container>
            </>
        );
    }
}
