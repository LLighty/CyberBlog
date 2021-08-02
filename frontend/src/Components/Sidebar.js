import React, { Component } from "react";
import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <div class="side-bar">
                <div>
                    <ul>
                        <li key="sb_webexploit" className="list-group-item d-flex justify-content-between align-items-center">Web Exploitation</li>
                        <li key="sb_reverseengineering" className="list-group-item d-flex justify-content-between align-items-center">Reverse Engineering</li>
                    </ul>
                </div>
            </div>
        );
      }
}

export default Sidebar;