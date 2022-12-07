import "./Contact.scss";

import { FaEnvelope, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import React, { useState } from "react";

import { BACKEND_URL } from "../../services/authService";
import Card from "../../components/card/Card";
import { GoLocation } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              cols="30"
              rows="10"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary btn-right">
              Send Message
            </button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>123456789</p>
              </span>
              <span>
                <FaEnvelope />
                <p>example@.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Address, State, Country</p>
              </span>
              <span>
                <FaGlobe />
                <p>www.webpage.com</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
