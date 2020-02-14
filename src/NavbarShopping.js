import React, { useState } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ShoppingCartIcon from './images/shopping_cart.png';

const NavbarShopping = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar light expand="md" className="sticky-bottom bg-info border border-dark">
          <NavbarBrand className="navbar-brand" href="#"><img src={ShoppingCartIcon} alt="WEAVE Logo" width="50rem" height="50rem"/></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="nav navbar-nav ml-auto w-100 justify-content-between" navbar>
              <NavItem>
                <NavLink className="text-light" href="#bakery">Bakery</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#beverage">Beverage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#cannedgood">Canned Goods</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#condiments">Condiments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#dairy">Dairy</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#deli">Deli</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#frozen">Frozen</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#household">Household</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#hygiene">Hygiene</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#meat">Meat</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#pet">Pet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-light" href="#produce">Produce</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
  export default NavbarShopping;