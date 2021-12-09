import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Typography, Button} from 'antd';
import 'antd/dist/antd.css';
import {StopOutlined,UnorderedListOutlined,PlusCircleOutlined} from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

function Index() 
{
    const { Header} = Layout;

    const loginValidation = () => {
        //Swal.fire({  title: 'Error!',  text: 'Please Log In',  icon: 'error',  confirmButtonText: 'OK'});
        var Var_Islogin = localStorage.getItem('session_username');

        if(Var_Islogin === null)
        {
            return <Redirect to={"/login/"} />
        }
    
    };
    
    return( 
        
    <Header className="site-layout-background" style={{ padding: 10 }}>
    {loginValidation()}
    <Typography.Title level={4} style={{color:"#34946e",float: 'left'}}>BFF - FABRIC YY AUTOMATION TOOL</Typography.Title>
    
    <Button onClick={()=>{window.location.href = "/login";}} style={{float: 'right', color:"red", borderColor:"red",marginLeft:"5px"}} type="dashed" size={"middle"} icon={<StopOutlined />}>
    Sign Out
    </Button>
    <Button onClick={()=>{window.location.href = "/newyy";}} style={{float: 'right', color:"#31946e", borderColor:"#34946e",marginLeft:"5px"}} type="dashed" size={"middle"} icon={<PlusCircleOutlined />}>
    New Fabric YY
    </Button>
    <Button onClick={()=>{window.location.href = "/dashboard";}} style={{float: 'right', color:"purple", borderColor:"purple",marginLeft:"5px"}} type="dashed" size={"middle"} icon={<UnorderedListOutlined />}>
    List Of Fabric YY
    </Button>
    </Header>);
}

export default Index;

