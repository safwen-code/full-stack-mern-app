import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Container } from "reactstrap"

const ProfileTopUser = ({ profile: {
    company, status, website, social, user: { name, email }
} }) => {

    return (
        <Container>
            <Row>
                <Col>
                    <ion-icon name="person-outline"></ion-icon>{' '} {name}
                </Col>
                <Col>
                    <ion-icon name="logo-google"></ion-icon>{' '}{email}
                </Col>
            </Row>
            <Row>
                <Col><p><ion-icon name="logo-ionitron"></ion-icon>{' '} {status} </p> </Col>
                <Col><p><ion-icon name="business-outline"></ion-icon>{' '}{company && <span> at {company}</span>}</p></Col>
            </Row>
            <Row></Row>
            <Row><Col>
                {social && social.twitter && (
     
                    <p><ion-icon name="logo-twitter"></ion-icon>{' '}<span>{social.twitter}</span></p>)}

                {social && social.facebook && (
                    <p><ion-icon name="logo-facebook"></ion-icon>{' '}<span>{social.facebook}</span></p>)}

                {social && social.youtube && (
                    <p><ion-icon name="logo-youtube"></ion-icon>{' '}<span>{social.youtube}</span></p>)}
                
                {social && social.instagram && (
                 <p><ion-icon name="logo-instagram"></ion-icon>{' '}<span>{social.instagram}</span></p>)}
                
                {social && social.linkedin && (
                        <p><ion-icon name="logo-linkedin"></ion-icon>{' '}<span>{social.linkedin}</span></p>)}
             
             </Col></Row>
        </Container>

    )
}

ProfileTopUser.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTopUser
