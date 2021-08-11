import React, { Component } from "react";

import {
  Link,
} from "react-router-dom";

import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <div class="side-bar">
                <div>
                    <ul>
                        <Link
                            key='1'
                            to={{
                                pathname: `/articles/tag/networking`,
                                tag: `networking`
                            }}
                        >
                            <li key="sb_webexploit" className="list-group-item d-flex justify-content-between align-items-center">Networking</li>
                        </Link>
                        <Link
                            key='2'
                            to={{
                                pathname: `/articles/tag/reverse-engineering`,
                                tag: `reverse-engineering`
                            }}
                        >
                            <li key="sb_reverseengineering" className="list-group-item d-flex justify-content-between align-items-center">Reverse Engineering</li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
      }
}

export default Sidebar;