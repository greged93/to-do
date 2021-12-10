import React from 'react';
import Navbar from './Navbar';
const ethers = require('ethers');

class App extends React.Component {

    async componentDidMount() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let addr = await signer.getAddress();
        this.setState({accountAddress: addr});
    }

    constructor(props) {
        super(props);
        this.state = {
            accountAddress: "0x",
            paused: false,
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar accountAddress={this.state.accountAddress} />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col">
                            <form action="/post" method="post" className="form">
                                <div>
                                    <label for="example">Add ToDo item</label> &nbsp;
                                    <input id="example" type="text" name="todo" />
                                </div>
                                <div className="mt-3">
                                    <input type="submit" value="Send" />
                                </div>
                            </form>
                        </div>
                        <div className="col">
                            Mark item done
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;