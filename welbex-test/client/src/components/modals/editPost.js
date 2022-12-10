import React, {useState, useContext, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Image, Col} from "react-bootstrap";

import {Context} from '../../index'
import { updatePost, fetchOneUser } from '../../http/userAPI';

const EditPost = ({show, onHide}) => {
    const {user} =  useContext(Context)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState()

    useEffect( ()=>{
        if(!file){
            setPreview(undefined)
            return
        }
  
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
  
    }, [file] )

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updPost = () => {
        const id = user.selectedPost.id
        const formData = new FormData()
        formData.append('title', title)
        if(content != null){
            formData.append('content', content)
        }
        if(file != null){
            formData.append('file', file)
        }
        console.log(formData)
        updatePost(formData, id).then(data => {
            console.log(data)
            hideWindow()
        }).catch(error => {
            console.log(error);
            alert("Something go wrong!")
        })
    }

    const hideWindow = ()=>{
        setFile(null)
        setContent('')
        setTitle("")
        fetchOneUser().then(data=>{user.setUserPosts(data.posts)})
        onHide()
    }

  return (
      <Modal
          onEntered  = 
            { 
                function(){ 
                    setTitle(user.selectedPost.title)
                    setContent(user.selectedPost.content)
                }
            }
          show={show}
          onHide={hideWindow} 
          centered
          size='lg'
      >
          <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                  Edit Post
              </Modal.Title>
              <Button variant="outline-danger" onClick={hideWindow}>X</Button>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Enter title..." 
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                  />
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Enter category name..." 
                      value={content}
                      onChange={e => setContent(e.target.value)}
                  />
                    <Form.Label className="mt-3">Select icon</Form.Label> <br/>
                    <Form.Control 
                        type="file" 
                        size="sm" 
                        onChange={selectFile}
                    />
                    <Col md={3}>
                    {file &&  <Image src={preview} width={305} height={135}/> }
                    </Col>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="success" 
                    onClick={
                    ()=>{
                        updPost()
                    }
                }>Edit</Button>
          </Modal.Footer>
      </Modal>
  );
};

export default EditPost;
