import React from "react";
import "./Home.css";
import bgVideo from "../../assets/bgVideo.mp4";
// import bgVideo2 from "../../assets/bgVideo2.mp4";
import logo from "../../assets/caklogo-removebg-preview.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <section className="showcase">
        <header className="header">
          <h2 className="logo">CAK Gym</h2>
          <div className="toggle"></div>
        </header>
        <video loop autoPlay muted>
          <source src={bgVideo} type="video/mp4" />
          {/* Add additional video sources here */}
        </video>
        <div className="overlay"></div>
        <div className="text">
          <h2>When There's a will </h2>
          <h3>There's a way</h3>
          <p>
            Embrace discipline and consistency as your faithful companions on
            this fitness journey. With unwavering commitment, you will unlock
            your full potential and achieve remarkable results. Stay focused,
            work hard, and let your dedication lead you to greatness!
          </p>
          <Link to="#">Explore</Link>
        </div>
        <ul className="social">
          <li>
            <Link to="#">
              <img src="https://i.ibb.co/x7P24fL/facebook.png" alt="facebook logo" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="twitter logo" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="instagram logo"/>
            </Link>
          </li>
        </ul>
      </section>

      <section className="SignUp-hero">
        <div className="form-box">
          <img className="logo-form" src={logo} alt="logo" />
          <h3 className="h3-msg" color="black">
            Kindly Type Your Phone Number To Get Your Subscription Expiration
            Date
          </h3>
          <form id="login" className="input-group">
            <input
              type="number"
              className="input-field-s"
              placeholder="Phone Number"
              required
            />

            <p className="date-membership">Date: 15-9-2022</p>
            <div className="btn-container">
              <button className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </section>

      {/* <div className="menu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default Home;
