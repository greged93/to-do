import React from 'react';

class Navbar extends React.Component {
    render() {
        return(
                <nav className="navbar navbar-expand-lg fixed-top navbar-light fixed-top p-0">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            To-Do List
                        </div>
                        <div className="mr-2 mt-2" style={{fontSize: "12px"}}>
                            Address: {this.props.accountAddress}
                        </div>
                    </div>
                </nav>
        )
    }
}

export default Navbar;