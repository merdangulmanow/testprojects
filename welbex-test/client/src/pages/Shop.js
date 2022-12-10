import React, {useContext, useEffect} from 'react';
import {Container, Row, Table, Image} from 'react-bootstrap'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts';
import { fetchAllPosts } from '../http/userAPI';

const Shop = observer(() => {
    const {device, user} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        fetchAllPosts().then(data=>{
            user.setPosts(data)
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
            <Row className="mt-2">
                {
                    user.isAuth ? 
                    <>
                        <Table responsive="md">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>File</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>                 
                                {user.posts.map(index =>
                                    <tr 
                                        key={index.id}
                                    >
                                        <td>{index.id}</td>
                                        <td>{index.title}</td>
                                        <td>{
                                            index.content ? index.content : <i>null contect</i>
                                        }</td>
                                        
                                        <td>
                                        <Image 
                                            width={122} height={54}
                                            src={ index.filename ? process.env.REACT_APP_API_URL+"api/"+index.filename : "" }
                                            onClick={
                                                ()=>{
                                                    index.filename ? window.open(process.env.REACT_APP_API_URL+"api/"+index.filename, "_blank") : alert("No file!") 
                                                }
                                            }
                                        />
                                        </td>
                                        <td>{timeConverter(index.createdAt) }</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </> 
                    : 
                    history.push(LOGIN_ROUTE)
                }                
            </Row>
        </Container>
    );
});

export default Shop;
