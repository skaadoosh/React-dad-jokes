import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import './JokeList.css'

class JokeList extends Component {
    static defaultProps = {
        numJokes: 2
    }
    constructor(props) {
        super(props);
        this.state = { jokes: [], isLoading: false };
        this.getLine = this.getLine.bind(this);
        this.handleVote = this.handleVote.bind(this);

    }

    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getLine();
        }
    }

    async getLine() {
        let arr = [];
        this.setState(st => ({ isLoading: true }))
        while (arr.length < this.props.numJokes) {
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            })
            let line = res.data
            arr.push({
                id: line.id,
                joke: line.joke,
                rate: 0
            })
        }
        this.setState(st => ({
            jokes: [...st.jokes, ...arr],
            isLoading: false
        }), () => {
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
        })
    }

    handleVote(id, val) {
        this.setState(st => ({
            jokes: st.jokes.map(
                j => j.id === id ? { ...j, rate: j.rate + val } : j
            )
        }))
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='JokeList-spinner'>
                    <i className='far fa-8x fa-laugh fa-spin' />
                    <h1 className='JokeList-title'>Loading...</h1>
                </div>
            )
        }

        const jokes = this.state.jokes.sort((a, b) => (a.rate - b.rate)).reverse().map(j => (
            <Joke className="Joke" key={j.id} joke={j.joke} rating={j.rate}
                upVote={j.rate < 10 ? () => this.handleVote(j.id, 1) : null}
                downVote={j.rate > -10 ? () => this.handleVote(j.id, -1) : null}
            />
        ))
        return (
            <div className="JokeList">
                <div className="JokeList-head">
                    <h1>Dad<span>Jokes</span></h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="laugh" />
                    <button className="JokeList-getmore" onClick={this.getLine}>Get New Jokes</button>
                </div>
                <div className="List">
                    {jokes}
                </div>
            </div>
        )
    }

}

export default JokeList