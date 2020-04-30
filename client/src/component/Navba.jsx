import React ,{useState} from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import {logout}  from '../action/registerAction'
import { Fragment } from "react";



const Navba =({authUser:{isAuthentification,loading},logout})=>{
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const authenicatedUser = (
      <Fragment>
    <NavItem>
    <NavLink href="https://github.com/safwen-code">
        github
    </NavLink>
    </NavItem>
    <NavItem>
    <NavLink onClick={logout}> Logout</NavLink>
    </NavItem>

    <Link to='/profiles'>
        <NavLink >
         devloppers
   
    </NavLink></Link>
    <Link to='/post'>
    <NavLink >
     posts

</NavLink></Link>
    </Fragment>
  )
  const guestLinks =(
    <NavItem>
   <Link to='/registerUser'>
        <NavLink >
         register
   
    </NavLink></Link>
    <Link to='/login'>
        <NavLink >
         Login
   
    </NavLink></Link>
    <Link to='/profiles'>
        <NavLink >
         devloppers
   
    </NavLink></Link>
    </NavItem>
  )

  
        return(
            <div>
             <Navbar color="dark" dark expand="sm" className="mb-5">
                 <Container>
                     <NavbarBrand href="/">
                       Shoppinglist
                     </NavbarBrand>
                     <NavbarToggler toggle={toggle}/>
                      <Collapse isOpen={setDropdownOpen} navbar>
                          <Nav className="ml-auto"  navbar>
                              <NavItem>
                              {!loading && (<Fragment>{isAuthentification ?authenicatedUser:guestLinks}</Fragment>)}
                              </NavItem>
                                  
                          </Nav>
                     </Collapse>
                 </Container>
                 
                 </Navbar> 
            </div>
        )
    }
  
    Navba.propTypes={
      logout : PropTypes.func.isRequired,
      authUser: PropTypes.object.isRequired,
  }
 const mapStateToProps =state=>({
    authUser:state.authUser
 })
export default connect(mapStateToProps, {logout})  (Navba)