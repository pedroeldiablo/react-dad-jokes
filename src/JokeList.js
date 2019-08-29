import React, { Component } from 'react';
import axios from 'axios';
import uuid from "uuid/v4";
import Joke from "./Joke"
import './JokeList.css';

class JokeList extends Component {
    static defaultProps = {
        numberJokesToGet: 10,
    };


    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")};
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
        this.handleClick = this.handleClick.bind(this);
    }

    async getJokes() {
        try {
        let jokes = [];
        while(jokes.length < this.props.numberJokesToGet){
            let response = 
            await axios.get("https://icanhazdadjoke.com/", 
            {headers: {Accept: 'application/json'}
            });
            let newJoke = response.data.joke;
            if(!this.seenJokes.has(newJoke)){
            jokes.push({id: uuid(), text: response.data.joke, votes: 0});
            } else {
                console.log("found a duplicate");
                console.log(newJoke);
            }
        }
        this.setState(st => ({ 
            loading: false,
            jokes: [...st.jokes, ...jokes]
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
        } catch(e) {
            alert(e);
            this.setState({loading: false })
        }
    }

    componentDidMount() {
        if( this.state.jokes.length === 0){
            this.getJokes();
        }
    }

    handleClick(){
        this.setState({loading: true}, this.getJokes);  
    }

    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? {...j, votes: j.votes + delta } : j
                    )
            }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    // componentDidUpdate() {
    //     let totalJokes = this.state.jokes.length;
    //         let totalVotes = 0;
    //         this.state.jokes.map(j => (
    //             totalVotes = totalVotes + j.votes
    //         ));
    //         if (totalVotes > 0 ) {
    //             console.log(totalVotes/totalJokes);
    //         }
    // }
   
    render() {
            if(this.state.loading) {
                return(
                    <div className="JokeList-spinner">
                        <img className="far fa-8x fa-cog fa-spin" src="happy.svg" alt="happy"/>
                        <h1 className="JokeList-title">Loading...</h1>
                    </div>
                )
            }
            return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <button className="JokeList-getMore" onClick={this.handleClick}>New jokes</button>
                </div>
                
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => (
                        <Joke 
                        key={j.id}
                        id={j.id}
                        votes={j.votes}
                        text={j.text}
                        upvote={() => this.handleVote(j.id, 1)}
                        downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
            );
    }
}
export default JokeList;
