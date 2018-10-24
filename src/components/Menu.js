import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  render() {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            let menu = document.getElementById("navbar");

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            menu.classList.toggle("is-active");
          });
        });
      }
    });
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a href="" className="navbar-item">
            Yummy
          </a>
          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbar" className="navbar-menu">

          <div className="navbar-start" />

          <div className="navbar-end">
            <a href="" className="navbar-item">
              Home
            </a>

            <a href="" className="navbar-item">
              Profile
            </a>
            <a href="" className="navbar-item">
              Create Recipe
            </a>
            <div className="navbar-item">
              <div className="buttons">
                <a href="" className="button is-primary">
                  <strong>Log In</strong>
                </a>
              </div>
            </div>
          </div>

        </div>
      </nav>
    );
  }
}

export default Menu;