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

    const [ds_factory, setds_factory] = React.useState([]);
    const [ds_customer, setds_customer] = React.useState([]);

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
                            description: data.Msg,
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

      React.useEffect(()=>{
 
        fetch(`${apiurl}/masterdata/getcustomers`)
        .then(res => res.json())
        .then(response => { 
  
            if(response.Type === "SUCCESS")
            {
              //alert(JSON.stringify(response.Data));
              setds_customer(response.Data);
            }
            else
            {
                notification['error']({
                    message: 'Data Error',
                    description: 'Customers Data Loading Error.',
                    style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                  });
            }
  
             
        })
        .catch(error => {
  
            notification['error']({
                message: 'Data Error',
                description: error,
                style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
              });
  
        });

        fetch(`${apiurl}/masterdata/getfactories`)
        .then(res => res.json())
        .then(response => { 
  
            if(response.Type === "SUCCESS")
            {
              setds_factory(response.Data);
            }
            else
            {
                notification['error']({
                    message: 'Data Error',
                    description: 'Factories Data Loading Error.',
                    style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                  });
            }
  
             
        })
        .catch(error => {
  
            notification['error']({
                message: 'Data Error',
                description: error,
                style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
              });
  
        });
  
      },[apiurl])
    
    return( <Layout style={{ minHeight: '100vh' }}>
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>FAB YY</Breadcrumb.Item>
          <Breadcrumb.Item>Create New Fabric YY Request</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
            <Typography.Title level={4}>Create New Fabric YY Request</Typography.Title>
            <Typography.Text type="danger">** Required Field</Typography.Text>
            <br/><br/>
            <Typography.Text type="info">1. Select Buyer Category **</Typography.Text><br/>
            <Select style={{ width: 120 }} onChange={handleChangeCategory}>
              {ds_customer.map((row) => (
                  <Select.Option value={row.cus_id}>{row.cus_name}</Select.Option>
            ))}
            </Select>
            <br/><br/>

            <Typography.Text type="info">2. Customer Style No **</Typography.Text><br/>
            <Input placeholder="OLR Style No" maxLength={12} onChange={onChangeStyleNo}/>
            <br/><br/>

            <Typography.Text type="info">3. M3 Style No **</Typography.Text><br/>
            <Input placeholder="M3 Style No" maxLength={12} onChange={onChangeM3StyleNo}/>
            <br/><br/>

            <Typography.Text type="info">4. Previous Style No</Typography.Text><br/>
            <Input placeholder="Previous Style No" maxLength={12} onChange={onChangeOldStyleNo}/>
            <br/><br/>

            <Typography.Text type="info">5. Factory **</Typography.Text><br/>
            <Select style={{ width: 120 }} onChange={handleChangeFactory}>
              {ds_factory.map((row) => (
                  <Select.Option value={row.fac_id}>{row.fac_name}</Select.Option>
            ))}
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

