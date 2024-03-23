import React from 'react';
import './About.css';
import { Card, Col, Row } from 'react-bootstrap'

import aboutlogo from '../../../assets/ab.png';

class About extends React.Component {
  state = {}
  render() {
    return (
      <div className='about'>

        <div className='a-left'>
          <div className='detailss'>
            <span>Hi Everyone, </span>
            <span style={{ color: "white" }}> “RatePulse” is a constructive criticism given to a candidate after they exit the professional interaction process. </span>

            <br />
            <br />
            This feedback system establishes trust between job seekers and employers by offering a transparent evaluation system and it is often helpful for candidates as they workshop for future interviews. The system encourages constructive criticism and positive comments to create a balanced evaluation.
            <br />
            <br />
            <Col>
            <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '58rem' }}>

              <Card.Body>
                <Card.Text>
                <span style={{ color: "block" }}>“If no one tells us where we are lagging, we are liable to make the same mistakes over and over again...” - Michael Turek. </span>
                </Card.Text>

              </Card.Body>
            </Card>

            </Col>

      
          </div>
        </div>

        <div className='a-right'>
          <img
            src={aboutlogo}
            alt="about pic"
            className="img-fluid"
            style={{ maxHeight: "350px" ,
          maxWidth: "250px"}}
          />
        </div>


      </div>
    );
  }
}

export default About;