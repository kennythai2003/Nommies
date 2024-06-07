// Profile.js
import React from "react";
import "../styles/profile.css";
import Banner from "./Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setFormData({
      userName: '',
      dateOfVisit: '',
      rating: '',
      reviewText: ''
    });
  }
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    userName: '',
    dateOfVisit: '',
    rating: '',
    reviewText: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/writeReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Review submitted successfully!');
      handleClose();
    } else {
      console.error('Error submitting review');
    }
  };

  return (
    <div className="profile-container">
      <Banner imageSrc="wingstop.jpeg" restaurantName="wingstop">
        <button className="edit-profile-button" onClick={handleShow}>add a review</button>
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDateOfVisit">
            <Form.Label>Date of Visit</Form.Label>
            <Form.Control
              type="date"
              name="dateOfVisit"
              value={formData.dateOfVisit}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min={1}
              max={5}
            />
          </Form.Group>

          <Form.Group controlId="formReviewText">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
        <button className="edit-profile-button">add a photo</button>
        <button className="edit-profile-button">share</button>
      </Banner>
    </div>
  );
};

export default Profile;
