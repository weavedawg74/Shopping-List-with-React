import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const Example = (props) => {
    
      
    return (
      <div>
        <Navbar light expand="md" className="bg-secondary-5 sticky-bottom">
         
            <Nav className="nav navbar-nav ml-auto w-100 justify-content-center flex-row" navbar>
            <NavItem>
                <NavLink href="/"><img src="https://i.imgur.com/VdArSaM.png" alt="WEAVE Logo" width="40rem" height="50rem"/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="mailto:weaverling.a@gmail.com"><img src="https://i.imgur.com/C9t63FA.png" title="Contact" alt="Contact" width="50rem" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.facebook.com/weavedawg74" target="_blank"><img src="https://i.imgur.com/zy2V17P.png" title="Facebook" alt="Facebook" width="50rem" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.linkedin.com/in/andrew-weaverling/" target="_blank"><img src="https://i.imgur.com/Hn8Ix3A.png" title="LinkedIn" alt="LinkedIn" width="50rem" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/weavedawg74" target="_blank"><img src="https://i.imgur.com/86gBT2g.png" title="Github" alt="Github" width="50rem" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.instagram.com/weavedawg74/" target="_blank"><img src="https://i.imgur.com/RgBDJCr.png" title="Instagram" alt="Instagram" width="50rem" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.youtube.com/channel/UCQJSMsybsmQmvPmgTOR5osw" target="_blank"><img src="https://i.imgur.com/aYOy66y.png" title="YouTube" alt="YouTube" width="50rem" /></NavLink>
              </NavItem>
             </Nav>
     
        </Navbar>
      </div>
    );
  }
  
  export default Example;