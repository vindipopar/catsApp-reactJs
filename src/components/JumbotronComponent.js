import React, { Component } from 'react';
import {
    Jumbotron,
  } from 'react-bootstrap';

export default class JumbotronComponent extends Component {
    render() {
        return (
            <>
                <Jumbotron>
                    <h1>Hii, Cats Lovers :)</h1>
                    <p>
                        This app can help you to find information all about the cats in the world
                    </p>
                </Jumbotron>
            </>
        );
    }
}
