import React from 'react'
import './Desc.css';
import { Link } from 'react-router-dom';
export default function Desc() {
    return (
        <div className='bow'>
            <header>
                <h1>Bridge for Supporting the Needy</h1>
                
                <nav>
                    <Link to="/signup" className="nav-link odd">Sign Up</Link>
                    <Link to="/login" className="nav-link even">Login</Link>
                </nav>
            </header>
            <section className="content">
                <img src="https://inspiringlearning.jiscinvolve.org/wp/files/2022/01/Helping-hand.png" className="left-image" />
                <div className="text-content">
                    <h2>About Us</h2>
                    <p>We aim to bridge the gap between surplus food sources and people in need. Our platform enables donors to contribute excess food and volunteers to distribute it efficiently.</p>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <ul>
                    <li>Donors register and list excess food items.</li>
                    <li>Volunteers collect and distribute food to those in need.</li>
                    <li>We ensure safe and efficient food handling.</li>
                </ul>
            </section>
            
        </div>
    );
};