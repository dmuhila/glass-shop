import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup"; 

import ScrollView from "./ScrollView";
import imageCart from './../cart.jpg';
import emptyCart from './../empty_cart.jpg';


class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems
        }
    }

    handleCart(e) {
        e.preventDefault();
        this.setState({
          showCart: !this.state.showCart
        });
      }

    handleClickOutside(event) {
        const cartNode =  findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if (cartNode.classList.contains("active")) {
          if (!cartNode || !cartNode.contains(event.target)) {
            this.setState({
              showCart: false
            });
            event.stopPropagation();
          }
        }
      }

    componentDidMount() {
    document.addEventListener(
        "click",
        this.handleClickOutside.bind(this),
        true
    );
    }

    componentWillUnmount() {
    document.removeEventListener(
        "click",
        this.handleClickOutside.bind(this),
        true
    );
    }

    render () {
        let cartItems;
        cartItems = this.state.cart.map(product => {
            return (
                <li className="cart-item" key={product.name}>
                <img className="product-image" src={product.image} />
                <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price}</p>
                </div>
                <div className="product-total">
                    <p className="quantity">
                    {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
                    </p>
                    <p className="amount">{product.quantity * product.price}</p>
                </div>
                <a
                    className="product-remove"
                    href="#"
                    onClick={this.props.removeProduct.bind(this, product.id)}
                >
                    ×
                </a>
                </li>
            );
        });
    let view;
    if (cartItems.length <= 0) {
      view = (<div className="empty-cart">
                <img
                    src={emptyCart}
                    alt="empty-cart"
                />
                <h2>You cart is empty!</h2>
            </div>);
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
        <div>
            <a
            className="cart-icon"
            href="#"
            onClick={this.handleCart.bind(this)}
            ref="cartButton"
            >
            <img
            className={this.props.cartBounce ? "tada" : " "}
            src={imageCart}
            alt="Cart"
            style={{width:'70px'}}
            />
            {this.props.totalItems ? (
            <span className="cart-count">{this.props.totalItems}</span>
            ) : (
            ""
            )}
        </a>
        <div
            className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
            }
            ref="cartPreview"
        >
            <ScrollView>{view}</ScrollView>
            <div className="action-block">
            <button
                type="button"
                className={this.state.cart.length > 0 ? " " : "disabled"}
            >
                PROCEED TO CHECKOUT
            </button>
            </div>
        </div>
    </div>
    )
    }
}

export default Cart