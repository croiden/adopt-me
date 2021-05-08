import * as React from "react";
import { navigate } from "@reach/router";

import pet from "@frontendmasters/pet";

import Carousel from "./Carousel.js";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

import ThemeContext from "./ThemeContext";

class Details extends React.Component {
    state = {
        loading: true,
        showModal: false,
    };
    componentDidMount() {
        pet.animal(this.props.id).then(({ animal }) => {
            this.setState({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false,
            });
        }, console.error);
    }
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    adopt = () => navigate(this.state.url);

    render() {
        if (this.state.loading) {
            return <h1>Loading ...</h1>;
        }
        const {
            media,
            animal,
            breed,
            location,
            description,
            name,
            showModal,
        } = this.state;
        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button
                                style={{ backgroundColor: theme }}
                                onClick={this.toggleModal}
                            >
                                Adopt {name}
                            </button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                </div>
                {showModal ? (
                    <Modal>
                        <div>
                            <h1>Would you like to adopt {name}?</h1>
                            <div className="buttons">
                                <button onClick={this.adopt}>Yes</button>
                                <button onClick={this.toggleModal}>No</button>
                            </div>
                        </div>
                    </Modal>
                ) : null}
            </div>
        );
    }
}

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}
