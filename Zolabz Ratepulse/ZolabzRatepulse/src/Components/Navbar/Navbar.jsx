import React from 'react';
import './Navbar.css';
import { Link} from "react-router-dom";

class Navbar extends React.Component {
    state = {  } 
    render() { 
        return (
            <div className='n-wrapper'>
                <div className='n-left'>
                    <div className='n-name'>
                        <Link to="/">RatePulse</Link>
                    </div>
                </div>
                <div className='n-right'>
                    <div className='n-list'>
                    <Link to="/login">Employer</Link>
                    
                    <Link to="/mylogin">Candidate</Link>                    
                    <Link to="/about">About RatePulse</Link>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Navbar;