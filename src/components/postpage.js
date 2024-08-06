
import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Container, Row, Col, Form, Button, Card, Image, Alert, Badge } from 'react-bootstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LikeButton from './likebutton';
import CommentButton from './comment';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
const PostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const generateOgImage = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('https://sde-server-1.onrender.com/api/image/generate-og-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOgImageUrl(response.data.ogImageUrl);
      setError('');
    } catch (error) {
      console.error('Error generating OG image:', error);
      setError('Failed to generate OG image');
    }
  };

  return (
    
    <Container className="background-container" fluid style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <h2 className="text-center mb-4 font-weight-bold">Create a Post</h2>
          <Form>
          
            <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
            <Form.Group controlId="formImageUpload" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageUpload}
              />
            </Form.Group>
            <Button variant="primary" onClick={generateOgImage}>
              Generate OG Image
            </Button>
          </Form>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          {ogImageUrl && (
  <Card className="my-4 mx-auto shadow-lg rounded" style={{ maxWidth: '1200px', borderRadius: '15px', overflow: 'hidden' }}>
    <Card.Body className="p-3">
      <Card.Title className="mb-2 pb-1">
        <a href={ogImageUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none',textAlign:"center", color: '#007bff', fontSize: '16px',}}>
          {ogImageUrl}
        </a>
      </Card.Title>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Badge bg="primary" style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
          <span className="text-white">D</span>
        </Badge>
        <p className="m-0 text-center flex-grow-1" style={{ fontSize: '16px', fontWeight: '500' }}>Developed code</p>
        <Badge bg="warning" style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
          <span className="text-white">R</span>
        </Badge>
      </div>
      <Card.Img
        variant="top"
        src={ogImageUrl}
        style={{ objectFit: 'cover', height: 'auto', maxHeight: '250px' }}
      />
    </Card.Body>
    <Card.Footer className="text-center bg-light p-2">
  <div className="d-flex justify-content-around align-items-center">
    <LikeButton />
    <CommentIcon />
    <ShareIcon />
  </div>
</Card.Footer>
  </Card>
)}


        </Col>
      </Row>
    </Container>
  );
};

export default PostPage;
