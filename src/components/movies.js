import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
class Movies extends React.Component {
    render() {
        return (
            <>



                <Card style={{ width: '18rem' }}>
                    <ListGroup.Item variant="primary"> Title: {this.props.movie.title}</ListGroup.Item>
                    <Card.Img variant="top" src={this.props.movie.image_url} />
                    <ListGroup.Item variant="secondary">Overview: {this.props.movie.overview}</ListGroup.Item>
                    <ListGroup.Item variant="success"> Average Vote: {this.props.movie.vote_average} </ListGroup.Item>
                    <ListGroup.Item variant="danger"> Total Vote: {this.props.movie.vote_count} </ListGroup.Item>
                    <ListGroup.Item variant="warning">Popularity: {this.props.movie.popularity} </ListGroup.Item>
                    <ListGroup.Item variant="info">Released Date: {this.props.movie.released_on}</ListGroup.Item>
                </Card>





            </>
        )
    }

}

export default Movies;