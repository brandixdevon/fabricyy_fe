import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, Select, Input, Button, notification } from 'antd';
import 'antd/dist/antd.css';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function CreateNew() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_api');
    var username = localStorage.getItem('session_username');

    const [var_customer, setvar_customer] = React.useState("");
    const [var_styleno, setvar_styleno] = React.useState("");
    const [var_m3styleno, setvar_m3styleno] = React.useState("");
    const [var_oldstyleno, setvar_oldstyleno] = React.useState("");
    const [var_factory, setvar_factory] = React.useState("");

    function handleChangeCategory(value) {
        setvar_customer(value);
      }

    function handleChangeFactory(value) {
        setvar_factory(value);
      }

      const onChangeStyleNo = (e) => {
        setvar_styleno(e.target.value)
      }

      const onChangeM3StyleNo = (e) => {
        setvar_m3styleno(e.target.value)
      }

      const onChangeOldStyleNo = (e) => {
        setvar_oldstyleno(e.target.value)
      }

      const handleClick = async () => {

        if(username === "")
        {
            notification['error']({
                message: 'Error',
                description: 'Can not verified user. Please Sign in again.',
                style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
        else if(var_customer  === "")
        {
            notification['error']({
                message: 'Error',
                description: 'Please Select Customer Again.',
                style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
        else if(var_styleno  === "")
        {
            notification['error']({
                message: 'Error',
                description: 'Please Enter Style No.',
                style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
        else if(var_m3styleno  === "")
        {
            notification['error']({
                message: 'Error',
                description: 'Please Enter M3 Style No.',
                style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
        else if(var_factory  === "")
        {
            notification['error']({
                message: 'Error',
                description: 'Please Select Factory.',
                style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
        else
        {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username" : username , 
                    "customer" : var_customer ,
                    "cus_style_no" : var_styleno ,
                    "m3_style_no" : var_m3styleno ,
                    "old_style_no" : var_oldstyleno ,
                    "factory" : var_factory 
                })
              };
          
                await fetch(`${apiurl}/fabricyy/createyy`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        notification['success']({
                            message: 'Success Notification',
                            description:data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          setInterval(() => {
                            window.location.href = "/edityy/"+ data.Data[0].fabyy_id;
                          }, 1000);
                    }
          
                    if(data.Type === "ERROR")
                    {
                        notification['error']({
                          message: 'Error Notification',
                          description:data.Msg,
                          style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                        });
                    }
          
                })
                .catch(error => 
                  {
                    notification['error']({
                      message: 'Error Notification',
                      description:error,
                      style:{color: '#fff',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                    });
                  });
        }
    
        
    
      };
    
    return( <Layout style={{ minHeight: '100vh' }}>
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>FAB YY</Breadcrumb.Item>
          <Breadcrumb.Item>Create New Fabric YY Project</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
            <Typography.Title level={4}>Create New Fabric YY Project</Typography.Title>
            <Typography.Text type="danger">** Required Field</Typography.Text>
            <br/><br/>
            <Typography.Text type="info">1. Select Your Buyer Category **</Typography.Text><br/>
            <Select defaultValue="VS Pink" style={{ width: 120 }} onChange={handleChangeCategory}>
                <Select.Option value="1">VS Pink</Select.Option>
                <Select.Option value="2">PVH</Select.Option>
            </Select>
            <br/><br/>

            <Typography.Text type="info">2. Customer Style No **</Typography.Text><br/>
            <Input placeholder="OLR Style No" maxLength={12} onChange={onChangeStyleNo}/>
            <br/><br/>

            <Typography.Text type="info">3. Customer M3 Style No **</Typography.Text><br/>
            <Input placeholder="M3 Style No" maxLength={12} onChange={onChangeM3StyleNo}/>
            <br/><br/>

            <Typography.Text type="info">4. Previous Style No</Typography.Text><br/>
            <Input placeholder="Previous Style No" maxLength={12} onChange={onChangeOldStyleNo}/>
            <br/><br/>

            <Typography.Text type="info">5. Factory **</Typography.Text><br/>
            <Select defaultValue="Welisara" style={{ width: 120 }} onChange={handleChangeFactory}>
                <Select.Option value="1">Welisara</Select.Option>
                <Select.Option value="2">Merigama 1</Select.Option>
                <Select.Option value="3">Merigama 2</Select.Option>
            </Select>
            <br/><br/>
            <Button type="primary" shape="round" size={"large"} onClick={handleClick}> Create </Button>

            </Col>
            <Col span={12} style={{padding:"15px"}}></Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default CreateNew;

