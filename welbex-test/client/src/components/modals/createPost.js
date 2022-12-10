import React, {useState, useEffect, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Image} from "react-bootstrap";
import {Context} from '../../index'
import { addNewPost, fetchOneUser } from '../../http/userAPI';

const CreatePost = ({show, onHide}) => {
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

  const savePost = () => {
    const formData = new FormData()
    formData.append('title', title)
    if(content != null){
        formData.append('content', content)
    }
    if(file != null){
        formData.append('file', file)
    }

    addNewPost(formData).then(data => {
        alert(data.id)
        hideWindow()
    }).catch(error => {
        console.log(error);
        alert("Something go wrong!")
    })
    }

    const hideWindow = ()=>{
        setFile(null)
        setContent('')
        setTitle('')
        fetchOneUser().then(data=>{user.setUserPosts(data.posts)})
        onHide()
    }
  return (
      <Modal
          show={show}
          onHide={hideWindow}
          centered
          size="lg"
      >
          <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                  Create new Post
              </Modal.Title>
              <Button variant="outline-danger" onClick={hideWindow}>X</Button>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Form.Label className="pr-5">Title</Form.Label>
                  <Form.Control
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder={"Enter title"}
                  />
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      placeholder={"Enter content"}
                  />
                  <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label className="mt-3">Select file</Form.Label> <br/>
                    <Form.Control 
                        type="file" 
                        size="sm" 
                        onChange={selectFile}
                    />
                </Form.Group>
                {file &&  <Image src={preview} width={305} height={135}/> }
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="success" onClick={savePost}>Create</Button>
          </Modal.Footer>
      </Modal>
  );
};

export default CreatePost;
