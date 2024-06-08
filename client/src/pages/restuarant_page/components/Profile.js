// Profile.js
import React from "react";
import "../styles/profile.css";
import Banner from "./Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false); 
  const [showShareModal, setShowShareModal] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    dateOfVisit: '',
    rating: '',
    reviewText: ''
  });

  const [errors, setErrors] = useState({});
  const [photoErrors, setPhotoErrors] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleReviewShow = () => setShowReviewModal(true);
  const handleReviewClose = () => {
    setShowReviewModal(false);
    setFormData({
      userName: '',
      dateOfVisit: '',
      rating: '',
      reviewText: ''
    });
    setErrors({});
  }
  const handlePhotoClose = () => {
    setShowPhotoModal(false);
    setSelectedFiles([]);
    setPhotoErrors('');
  }
  const handlePhotoShow = () => setShowPhotoModal(true);

  const handleShareShow = () => setShowShareModal(true);
  const handleShareClose = () => setShowShareModal(false);


  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'User name is required';
    if (!formData.dateOfVisit) newErrors.dateOfVisit = 'Date of visit is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    if (!formData.reviewText) newErrors.reviewText = 'Review text is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await fetch('http://localhost:8080/writeReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Review submitted successfully!');
      handleReviewClose();
    } else {
      console.error('Error submitting review');
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setSelectedFiles(e.target.files);
    setPhotoErrors('');
  };
  
  const handlePhotoUpload = (e) => {
    if (selectedFiles.length === 0) {
      setPhotoErrors('Please select a file to upload');
      return;
    }
      handlePhotoClose();
  }

  return (
    <div className="profile-container">
      <Banner imageSrc="wingstop.jpeg" restaurantName="wingstop">
        <button className="edit-profile-button" onClick={handleReviewShow}>add a review</button>
        <Modal show={showReviewModal} onHide={handleReviewClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="userName"
              value={formData.userName}
              onChange={handleReviewChange}
              isInvalid={!!errors.userName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDateOfVisit">
            <Form.Label>Date of Visit</Form.Label>
            <Form.Control
              type="date"
              name="dateOfVisit"
              value={formData.dateOfVisit}
              onChange={handleReviewChange}
              isInvalid={!!errors.dateOfVisit}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.dateOfVisit}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleReviewChange}
              isInvalid={!!errors.rating}
              required
              min={1}
              max={5}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formReviewText">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleReviewChange}
              isInvalid={!!errors.reviewText}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.reviewText}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReviewClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleReviewSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
        <button className="edit-profile-button" onClick={handlePhotoShow}>add a photo</button>
        <Modal
          show={showPhotoModal}
          onHide={handlePhotoClose}
          backdrop="static"
          keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>Upload a Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload multiple files</Form.Label>
            <Form.Control type="file" multiple onChange={handlePhotoChange}/>
            {photoErrors && <div className="text-danger">{photoErrors}</div>}
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePhotoClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePhotoUpload}>Upload</Button>
          </Modal.Footer>
          </Modal>
        <button className="edit-profile-button" onClick={handleShareShow}>share</button>
        <Modal show={showShareModal} onHide={handleShareClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="share-icons">
              <Button onClick = {handleShareClose}><FontAwesomeIcon icon={faFacebook} size="2x"/></Button>
              <Button onClick = {handleShareClose}><FontAwesomeIcon icon={faTwitter} size="2x"/></Button>
              <Button onClick = {handleShareClose}><FontAwesomeIcon icon={faInstagram} size="2x"/></Button>
              <Button onClick = {handleShareClose}><FontAwesomeIcon icon={faEnvelope} size="2x"/></Button>
              <Button onClick = {handleShareClose}><FontAwesomeIcon icon={faMessage} size="2x"/></Button>
            </div>
          </Modal.Body> 
        </Modal>
      </Banner>
    </div>
  );
};

export default Profile;
