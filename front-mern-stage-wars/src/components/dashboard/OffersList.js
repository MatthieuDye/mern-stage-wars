import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getOffers, deleteOffer } from '../../actions/offerActions';
import PropTypes from 'prop-types';
import { logoutUser } from "../../actions/authActions";
import Offer from './Offer'

class OffersList extends Component {
  static propTypes = {
    getOffers: PropTypes.func.isRequired,
    offer: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteOffer(id);
  };

  render() {
    const { offers } = this.props.offer;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='offers-list'>
            {offers.map(({ _id, title }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {title}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  offer: state.offer,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getOffers, deleteOffer }
)(OffersList);