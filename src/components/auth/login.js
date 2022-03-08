import React from 'react';
import logo from './logo.svg';
import '../../App.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, notification, Card  } from 'antd';
import { Redirect } from 'react-router-dom';

function App() {

  localStorage.setItem('session_api','http://bff-sr-01:8280');
  //localStorage.setItem('session_api','http://localhost:1500');
  var apiurl = localStorage.getItem('session_api');
  

  const [VALUE_USERNAME, setVALUE_USERNAME] = React.useState([]);
  const [VALUE_PASSWORD, setVALUE_PASSWORD] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  const OnChange_username = (e) => {
    setVALUE_USERNAME(e.target.value);
  };

  const OnChange_password = (e) => {
    setVALUE_PASSWORD(e.target.value);
  };

  const handleClick = () => {

    if(VALUE_USERNAME !== "" || VALUE_PASSWORD !== "")
    {
      const sendOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username" : VALUE_USERNAME , "password" : VALUE_PASSWORD})
      };
  
        fetch(`${apiurl}/login/checkuser`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            {
              localStorage.setItem('session_username',data.username);
              setRedirect(true);
            }
  
            if(data.Type === "ERROR")
            {
                localStorage.clear();
                notification['error']({
                  message: 'Notification Title',
                  description:data.Msg,
                  style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
            }
  
        })
        .catch(error => 
          {
            notification['error']({
              message: 'Notification Title',
              description:error,
              style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
            });
          });
    }
    else
    {
      notification['error']({
        message: 'Notification Title',
        description: 'Invalid Username or Password, Please Use Brandix User Account.',
        style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
      });
    }

    

  };

  const renderRedirect = () => {
    if (redirect) 
    {
      return <Redirect to={"/dashboard"} />
    }
    else
    {
      localStorage.clear();
      return <Redirect to={"/login"} />
    }

}


  return (
    <div className="App" style={{backgroundColor:"#34946e"}}>
    {renderRedirect()}
      <header className="App-header">
      <Card title="FABRIC YY AUTOMATION TOOL" bordered={false} style={{ width: 500,backgroundColor:"#37cc91", padding:"20px" }}>
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <br/>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        onChange={OnChange_username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        onChange={OnChange_password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button  onClick={() => handleClick()} type="primary" size={"large"} style={{width: 200,backgroundColor:"#34946e",color:"white",borderColor:"white"}} htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
        <p style={{color:"#343434"}}>Ver 22.3.9</p>
    </Card>
      </header>
    </div>
  );
}

export default App;