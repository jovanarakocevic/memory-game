import React from 'react';

let images = ['card-1.jpeg', 'card-2.jpeg', 'card-3.jpeg', 'card-4.jpeg', 'card-5.jpeg', 'card-6.jpeg'];
images = images.concat(images);
const joker = 'joker.png';
images.sort(() => .5 - Math.random());

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            firstOpen: -1,
            secondOpen: -1,
            cnt: 1,
            attempts: 5,
        }
    }

    matchImageHandler = (index1, index2) => {
        let status = this.state.status;
        if (images[index1] !== images[index2]) {
            // console.log(this.state.status)
            setTimeout(function () {
                status[index1] = 0;
                status[index2] = 0;
            }, 100);

            this.setState(current_state => { return { attempts: current_state.attempts - 1 } });
        }
        this.setState({ status: status, firstOpen: -1, secondOpen: -1 })
    }

    imageHandler = (index) => {
        if (this.state.status[index] === 0 && this.state.attempts > 0) {
            let status = this.state.status;
            status[index] = 1;
            this.setState({ status: status })
            if (this.state.cnt % 2 !== 0) {
                this.setState({ firstOpen: index }, () => nazivFje(true, index))
            }
            else {
                this.setState({ secondOpen: index }, () => nazivFje(false, index))
            }
            this.setState(current_state => { return { cnt: current_state.cnt + 1 } });
        }
        const nazivFje = (firstOpen, val) => {
            if (this.state.secondOpen !== -1) {
                let index1 = firstOpen ? val : this.state.firstOpen;
                let index2 = firstOpen ? this.state.secondOpen : val;
                this.matchImageHandler(index1, index2);
            }
        }
        if (this.state.attempts === 0) {
            this.setState(prevState => ({
                status: prevState.status
            }))
        }
    }
    
    render() {
        console.log(this.state.status)
        
        return (
            <div className="row" style={{ maxWidth: '450px' }}>
                <div>Preostalo poteza: {this.state.attempts}</div>
                {images.map((el, index) => {
                    return <img className="col s4" height="150" width="150"
                        onClick={() => this.imageHandler(index)} key={index} src={`/images/${this.state.status[index] === 0 ? joker : el}`} alt="nophoto" />
                })}
            </div>
        );
    }
}

export default Board;