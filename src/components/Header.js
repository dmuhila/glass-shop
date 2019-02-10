import React, { Component } from "react";

import Cart from "./Cart.js"

import imageGlass from './../Glass.jpg';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileSearch: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }

  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }

  render() {
    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              src={imageGlass}
              alt="Glass Logo"
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
                alt="search"
              />
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                  alt="back"
                />
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Glass Search"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              <button
                className="search-button"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Cart cartBounce={this.props.cartBounce} cartItems={this.props.cartItems}
                  totalItems={this.props.totalItems} removeProduct={this.props.removeProduct}
                   />
          </div>
          </div>
      </header>
    );
  }
}

export default Header;
