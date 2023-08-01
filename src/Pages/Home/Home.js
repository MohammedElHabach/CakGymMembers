import React, { useEffect, useState } from "react";
import "./Home.css";
import bgVideo from "../../assets/bgVideo.mp4";
// import bgVideo2 from "../../assets/bgVideo2.mp4";
import logo from "../../assets/caklogo-removebg-preview.png";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getExpirationDateByPhone } from "../../features/Members/membersSlice";
import { toast } from "react-toastify";
const Home = () => {
  const [showExpDate, setShowExpDate] = useState(false);
  const [enteredPhone, setEnteredPhone] = useState("");

  const notifyError = () => toast.error("Enter Your Phone Number");

  const dispatch = useDispatch();
  const { expirationDate, trainer, isLoading, isError, message } = useSelector(
    (state) => state.members
  );

  const handleGetExpDate = (e) => {
    e.preventDefault();
    if (enteredPhone.trim() === "") {
      notifyError();
      return;
    }

    dispatch(getExpirationDateByPhone(enteredPhone));
    setEnteredPhone("");
    setShowExpDate(false);
  };

  useEffect(() => {
    if (isLoading) {
      setShowExpDate(false);
    } else if (expirationDate) {
      setShowExpDate(true);
    } else if (isError || message) {
      toast.error(message);
      setShowExpDate(false);
    } else {
      setShowExpDate(false);
    }
  }, [isLoading, expirationDate, setShowExpDate, isError, message]);

  return (
    <>
      <section className="showcase">
        <header className="header">
          <h2 className="logo">CAK Gym</h2>
        </header>
        <video loop autoPlay muted>
          <source src={bgVideo} type="video/mp4" />
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
          <a style={{ cursor: "pointer" }} href="#exp-date">
            Explore
          </a>
        </div>
        <ul className="social">
          <li>
            <Link
              target="_blank"
              to="https://www.facebook.com/cakgym?mibextid=LQQJ4d"
            >
              <img
                src="https://i.ibb.co/x7P24fL/facebook.png"
                alt="facebook logo"
              />
            </Link>
          </li>
          {/* <li>
            <Link to="#">
              <img
                src="https://i.ibb.co/Wnxq2Nq/twitter.png"
                alt="twitter logo"
              />
            </Link>
          </li> */}
          <li>
            <Link
              target="_blank"
              to="https://instagram.com/cak_gym?igshid=MzRlODBiNWFlZA=="
            >
              <img
                src="https://i.ibb.co/ySwtH4B/instagram.png"
                alt="instagram logo"
              />
            </Link>
          </li>
        </ul>
      </section>

      <section id="exp-date" className="top-container">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt"></i>
                <div className="topic">Address</div>
                <div className="text-one">Lebanon, Centro Mall</div>
                <div className="text-two">2nd Floor</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt"></i>
                <div className="topic">Phone</div>
                <div className="text-one">+961 01 821 904</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope"></i>
                <div className="topic">Email</div>
                <div className="text-one">codinglab@gmail.com</div>
              </div>
            </div>
            <div className="right-side">
              <img className="logo-form" src={logo} alt="logo" />
              <div className="topic-text">
                Kindly type your Phone Number to get you expiration subscription
                date
              </div>
              <p></p>
              <form onSubmit={handleGetExpDate}>
                <div className="input-box">
                  <input
                    required
                    className="phone-input"
                    type="number"
                    placeholder="Phone Number"
                    value={enteredPhone}
                    onChange={(e) => setEnteredPhone(e.target.value)}
                  />
                </div>
                {showExpDate && expirationDate && (
                  <>
                    <p>Exp-Date: {expirationDate.split("T")[0]}</p>
                    <p>Trainer: {trainer} </p>
                  </>
                )}

                <div className="btn-container">
                  <input className="submit-btn" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
