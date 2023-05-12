import React from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

function AppNav() {

  return (
    <div>
      <Navbar color='dark' dark>
        <NavbarBrand href="/">User Management</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default AppNav;