import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import "./layout.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>{this.props.children}</Container>
        <footer>
          <ul>            
          <li>Created by: Santosh Karanam</li>
          <li>
            Contact information:{" "}
            <a href="mailto:santosh.karanam@iiasa.ac.at">
              santosh.karanam@iiasa.ac.at
            </a>
          </li>
          </ul>
        </footer>
      </div>
    );
  }
}
