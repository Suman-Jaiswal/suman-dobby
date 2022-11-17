import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Form, Button, Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import Demo from './ImageViewer';

export default function Dashboard({ user, setIsAuthenticated, isAuthenticated }) {

   const navigate = useNavigate();
   const [show, setShow] = React.useState(false);
   const [images, setImages] = React.useState([]);
   const [filteredImages, setFilteredImages] = React.useState([]);
   const [image, setImage] = React.useState(null);
   const [title, setTitle] = React.useState('');
   const [loading, setLoading] = React.useState(true);
   const [search, setSearch] = React.useState('');
   const [showModal, setShowModal] = React.useState(false);

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      navigate('/auth');
   };

   var getInitials = function (string) {
      var names = string.split(' '),
         initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
         initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
   }

   useEffect(() => {
      if (!isAuthenticated) {
         navigate('/auth');
      }

      setLoading(true);
      axios.get('http://localhost:5000/images', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
         .then(res => {
            setLoading(false);
            setImages(res.data);
         })

   }, [isAuthenticated, navigate]);


   const handleUpload = async (e) => {
      e.preventDefault();
      if (!image || !title) {
         alert('Please select an image and enter a title!');
         return
      }

      setLoading(true);
      const doc = {
         title,
         buffer: image
      }

      axios.post('http://localhost:5000/images', doc, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
         .then(res => {
            setLoading(false);
            setShow(false);
            setImages([...images, res.data]);
         })
   };

   useEffect(() => {
      setFilteredImages(images.filter(image => image.title.toLowerCase().includes(search.toLowerCase())));
      console.log('s');
   }, [images, search]);

   return (
      <div className="Dashboard">
         {
            user &&
            <>
               {
                  loading ? <div className='h4 mt-5 text-center'>Loading...</div> :
                     <>
                        <Navbar variant='dark' bg='dark' className='py-3' expand="lg">
                           <Container fluid>
                              <Navbar.Brand className='fw-bold' >Cloud Gallery</Navbar.Brand>
                              <Navbar.Toggle aria-controls="navbarScroll" />
                              <Navbar.Collapse id="navbarScroll">
                                 <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                 >
                                 </Nav>
                                 <Form className="d-flex">
                                    <Form.Control
                                       type="search"
                                       placeholder="Search"
                                       className="me-2"
                                       aria-label="Search"
                                       onChange={(e) => setSearch(e.target.value)}
                                    />
                                 </Form>
                                 <Button className='ms-4' onClick={() => setShow(true)} >Upload</Button>
                                 <Nav>
                                    <NavDropdown drop='start' className='text-light ms-4 me-3' title={getInitials(user.name)} id="navbarScrollingDropdown"
                                       style={{
                                          fontSize: '1rem',
                                          fontWeight: 'bold',
                                       }}>
                                       <div className="box p-3">
                                          <div className="fw-bold ">{user.name}</div>
                                          <div className="text-secondary ">{user.email}</div>
                                       </div>
                                       <NavDropdown.Divider />
                                       <NavDropdown.Item className='text-danger' onClick={handleLogout}>
                                          Logout
                                       </NavDropdown.Item>
                                    </NavDropdown>
                                 </Nav>

                              </Navbar.Collapse>
                           </Container>
                        </Navbar>

                        <div className="container-fluid m-3">
                           <div className="row">
                              {
                                 filteredImages.length > 0 ? filteredImages.map((image, index) => (
                                    <div className="col-2" key={index}>
                                       <div className="card" role={'button'} onClick={() => setShowModal(true)}>
                                          <Demo img={image} showModal={showModal} setShowModal={setShowModal} />
                                          <div className="card-body">
                                             <img src={image.buffer} className='card-image' alt="" style={{ width: "100%", borderBottom: "1px solid grey" }} />
                                             <h5 className="card-title text-center mt-3">{image.title}</h5>
                                          </div>
                                       </div>
                                    </div>
                                 )) : <div className="text-center mt-5 h5">No images!</div>
                              }

                           </div>
                        </div>

                        <Modal show={show} onHide={() => setShow(false)} >
                           <Modal.Header closeButton>Upload an Image!</Modal.Header>
                           <Modal.Body>
                              <Form onSubmit={handleUpload}>
                                 <Form.Control type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} required />
                                 <br />
                                 <FileBase64
                                    multiple={false}
                                    required={true}
                                    onDone={({ base64 }) => setImage(base64)} />
                                 <img src={image} alt="" style={{
                                    width: '100%',
                                 }} />
                                 <Button className='mt-3' variant='primary' type='submit'>Upload</Button>
                              </Form>
                           </Modal.Body>
                        </Modal>

                     </>

               }

            </>

         }


      </div>
   )
}
