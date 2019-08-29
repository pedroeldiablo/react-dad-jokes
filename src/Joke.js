import React, { Component } from 'react';
import './Joke.css';
class Joke extends Component {
    getColor() {
        if(this.props.votes >= 15) {
            return "#71dc39";
        } else if (this.props.votes >= 12) {
            return "#CDDC39";
        }else if (this.props.votes >= 9) {
            return "#CDDC39";
        }else if (this.props.votes >= 6) {
            return "#ffeb3b";
        }else if (this.props.votes >= 3) {
            return "#ffc107";
        }else if (this.props.votes >= 0) {
            return "#ff9800";
        } else {
            return "#f44336";
        }
    }

    getEmoji() {
        if(this.props.votes >= 15) {
            return "em-rolling_on_the_floor_laughing";
        } else if (this.props.votes >= 15) {
            return "em-laughing";
        }else if (this.props.votes >= 10) {
            return "em-smile";
        }else if (this.props.votes >= 5) {
            return "em-slightly_smiling_face";
        }else if (this.props.votes >= 0) {
            return "em-neutral_face";
        }else if (this.props.votes >= -5) {
            return "em-confused";
        } else {
            return "em-angry";
        }
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fa fa-arrow-up" onClick={this.props.upvote}/>
                    <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <i className="fa fa-arrow-down" onClick={this.props.downvote}/>
                </div>
                <div className="Joke-text">
                    {this.props.text} 
                </div>
                <div className="Joke-smiley">
                    <i className={`em ${this.getEmoji()}`}></i>
                </div>
            </div>
        );
    }
}

export default Joke;
