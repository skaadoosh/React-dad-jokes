import React, { Component } from "react";
import './Joke.css'
import '@fortawesome/fontawesome-free/css/all.css'

class Joke extends Component {

    getColor(rating) {
        if (rating >= 0 && rating < 5) return 'yellow'
        else if (rating >= 5) return 'green'
        else if (rating < 0 && rating >= -5) return 'orange'
        else return 'red'
    }

    render() {
        const { rating } = this.props;

        let classes = "em-laughing"
        if (rating >= 5) classes = "em-rolling_on_the_floor_laughing"
        else if (rating < 0 && rating > -5) classes = "em-neutral_face"
        else if (rating <= -5) classes = "em-unamused"
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fa-solid fa-arrow-up" onClick={this.props.upVote}></i>
                    <p className="Joke-votes" style={{ borderColor: this.getColor(this.props.rating) }}>{rating}</p>
                    <i className="fa-solid fa-arrow-down" onClick={this.props.downVote}></i>
                </div>
                <p className="Joke-text">{this.props.joke}</p>
                <div className="Joke-smiley">
                    <i className={`em ${classes}`}></i>
                </div>
            </div>
        )
    }
}

export default Joke