import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Row, Table, Image} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import {fetchOneUser} from '../http/userAPI'
import {Context} from "../index";
import CreatePost from '../components/modals/createPost';
import EditPost from '../components/modals/editPost';

const UserPosts = observer(() => {

    const {device, user} = useContext(Context)
    const [postModalVisible, setPostModalVisible] =  useState(false)
    const [editPostVisible, setEditPostVisible] = useState(false)

    useEffect(() => {
        fetchOneUser().then(data=>{
            user.setUserPosts(data.posts)
        })
    }, [])

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    return (
        <Container>
            <CreatePost show={postModalVisible} onHide={() => setPostModalVisible(false)}/>
            <EditPost show={editPostVisible} onHide={() => setEditPostVisible(false)}/>
            <Row className='mt-3'>
                <Button
                    variant={"outline-info"}
                    onClick={() => setPostModalVisible(true)}
                >
                    Creta Post
                </Button>
            </Row>
            <Table responsive="md" className='m-2'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>File</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.userPosts ? 
                        <>
                            {
                                user.userPosts.map(item=>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{
                                            item.content ? item.content : <i>null contect</i>
                                        }</td>
                                        <td>
                                        <Image 
                                            width={122} height={54}
                                            src={ item.filename ? process.env.REACT_APP_API_URL+"api/"+item.filename : "" }
                                            onClick={
                                                ()=>{
                                                    item.filename ? window.open(process.env.REACT_APP_API_URL+"api/"+item.filename, "_blank") : alert("No file!") 
                                                }
                                            }
                                        />
                                        </td>
                                        <td>{timeConverter(item.createdAt) }</td>
                                        <td>
                                            <Button
                                                variant='outline-success'
                                                onClick={()=>{
                                                    user.setSelectedPost(item)
                                                    setEditPostVisible(true)
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </>
                        :
                        null
                    }
                </tbody>
            </Table>
        </Container>
    );
});

export default UserPosts;
