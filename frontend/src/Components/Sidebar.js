import React, { Component } from "react";
import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <div class="side-bar">
                <div>
                    <ul>
                        <li>Web Exploitation</li>
                        <li>Reverse Engineering</li>
                    </ul>
                </div>
            </div>
        );
      }
}

export default Sidebar;