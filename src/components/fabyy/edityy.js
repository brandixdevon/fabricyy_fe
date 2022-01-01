import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, Tooltip, Select, Input, Button, notification, Collapse } from 'antd';
import 'antd/dist/antd.css';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import { CaretRightOutlined,CloudDownloadOutlined,SearchOutlined  } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';
import ScaleLoader from "react-spinners/ScaleLoader";
import Modal from 'react-modal';

function CreateNew() 
{
    const {Content} = Layout;
    const { Panel } = Collapse;
    const { Option } = Select;
        
    var apiurl = localStorage.getItem('session_api');
    var username = localStorage.getItem('session_username');
    const [fabyyid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [var_customer, setvar_customer] = React.useState("");
    const [var_styleno, setvar_styleno] = React.useState("");
    const [var_m3styleno, setvar_m3styleno] = React.useState("");
    const [var_oldstyleno, setvar_oldstyleno] = React.useState("");
    const [var_factory, setvar_factory] = React.useState("");
    const [var_crdate, setvar_crdate] = React.useState("");

    const [var_btngetbom, setvar_btngetbom] = React.useState(true);
    const [var_drpseason, setvar_drpseason] = React.useState(true);
    const [isloading, setisloading] = React.useState(false);

    const [ds_seasonlist,setds_seasonlist] = React.useState([]);
    const [ds_bomlist,setds_bomlist] = React.useState([]);

    const [ds_plm_bomfull,setds_plm_bomfull] = React.useState([]);
    const [ds_plm_bomcolors,setds_plm_bomcolors] = React.useState([]);

    const [fileOLR, setFileOLR] = React.useState("");
    const [fileOLR_data, setFileOLR_data] = React.useState([]);
    const [fileOLR_cols, setFileOLR_cols] = React.useState([]);

    const [var_plmsession, setvar_plmsession] = React.useState("");
    const [var_plmstyle, setvar_plmstyle] = React.useState("");
    const [var_plmsseason, setvar_plmsseason] = React.useState("");
    const [var_plmrevbom, setvar_plmrevbom] = React.useState("");

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '400px',
        height: '170px',
        bottom: 'auto',
        textAlign: 'Center',
        transform: 'translate(-50%, -50%)',
        borderColor:'#9013FE',
        borderWidth:'2px',
        borderRadious: '5px'
      },
    };
    
    React.useEffect(()=>{

      const sendOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username" : username , 
            "typeid" : fabyyid
        })
      };
    
      fetch(`${apiurl}/fabricyy/listofyy`,sendOptions)
      .then(res => res.json())
      .then(response => { 

          if(response.Type === "SUCCESS")
          {
              //setds_alllist(response.Data);
              setvar_customer(response.Data[0].cus_name);
              setvar_styleno(response.Data[0].cus_sty_no);
              setvar_m3styleno(response.Data[0].m3_sty_no);
              setvar_oldstyleno(response.Data[0].old_sty_no);
              setvar_factory(response.Data[0].fac_name);
              setvar_crdate(response.Data[0].create_ts);
          }
          else
          {
              notification['error']({
                  message: 'Data Error',
                  description: 'Data Loading Error.',
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

    },[apiurl,username,fabyyid])
 
      async function handleUploadOLR(event) {
        
        //setisloading(true);
         readXlsxFile(event.target.files[0]).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.

            let OLRITEMS = [];

              if (rows[0][30] !== "MASTSTYLEDESC") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. MASTSTYLEDESC Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][31] !== "CUSTSTYLE") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. CUSTSTYLE Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][1] !== "CUSTNAME") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. CUSTNAME Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][32] !== "CUSTSTYLEDESC") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. CUSTSTYLEDESC Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][62] !== "SEASON") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. SEASON Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][34] !== "MASTCOLORDESC") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. MASTCOLORDESC Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][40] !== "CUSTSIZEDESC") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. CUSTSIZEDESC Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else if (rows[0][41] !== "ORDERQTY") 
              {
                setisloading(false);

                notification['error']({
                  message: 'Error',
                  description: 'This Excel File Not In Correct Format. ORDERQTY Can not Identifired.',
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });
                return;
              }
              else
              {
                
                // eslint-disable-next-line
                rows.map((items => {
                  
                  if(String(items[31]).toLowerCase() === String(var_styleno).toLowerCase() && String(items[1]).toUpperCase() !== "CUSTNAME")
                  {
                    OLRITEMS.push({CUSTNAME: items[1],MASTSTYLEDESC: items[30],CUSTSTYLE: items[31],CUSTSTYLEDESC: items[32],MASTCOLORDESC: items[34],CUSTSIZEDESC: items[40],ORDERQTY: items[41],SEASON: items[60]})
                   
                  }

                }))

             
                const sendOptions = {
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      "fabyyid" : fabyyid , 
                      "olrdata" : OLRITEMS
                  })
                };
              
                fetch(`${apiurl}/fabricyy/uploadolr`,sendOptions)
                .then(res => res.json())
                .then(response => { 
          
                    if(response.Type === "SUCCESS")
                    {
                      setisloading(false);
 
                      notification['success']({
                        message: 'Data Success',
                        description: response.Msg,
                        style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                      }); 
                    }
                    else
                    {
                      setisloading(false);

                        notification['error']({
                            message: 'Data Error',
                            description: response.Msg,
                            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                          });
 
                    }
          
                     
                })
                .catch(error => {
                  setisloading(false);

                    notification['error']({
                        message: 'Data Error',
                        description: error,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      }); 
          
                });

              }

          })


      }

      const plmstyleonchange = (e) => {
        setvar_plmstyle(e.target.value);
        setvar_drpseason(true);

      }

      async function getPLMSeasonList()
      {
        setvar_drpseason(true);
        setisloading(true);

        setds_seasonlist([]);
        setds_bomlist([]);

        await fetch(`${apiurl}/plmaccess/plmsession`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setvar_plmsession(response.Token);

              const sendOptions_2 = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "styleid" : var_plmstyle , 
                    "token" : response.Token})
              };
    
              fetch(`${apiurl}/plmaccess/plmseasonslist`,sendOptions_2)
              .then(res_1 => res_1.json())
              .then(response_1 => { 
    
                  if(response_1.Type === "SUCCESS")
                  {
                      setds_seasonlist(response_1.Dataset);
                      setvar_drpseason(false);
                      setisloading(false);
                      notification['success']({
                        message: 'Success Notification',
                        description:`${response_1.Dataset.length} No of Seasons are loading.` ,
                        style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                      });

                      
                  }
                  else
                  {
                    setisloading(false);
                      notification['error']({
                          message: 'Data Error',
                          description: 'Data Loading Error.',
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
                  }
    
                  
              })
              .catch(error_1 => {
                setisloading(false);
                  notification['error']({
                      message: 'Data Error',
                      description: error_1,
                      style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                    });
    
              }); 

            }
            else
            {
              setisloading(false);
                notification['error']({
                    message: 'Data Error',
                    description: 'Can not Access PLM Using API (Token Error).',
                    style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                  });
            }

            
        })
        .catch(error => {
          setisloading(false);
            notification['error']({
                message: 'Data Error',
                description: error,
                style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
              });

        });

        
        
      }

      async function handleChangeSeason(value) {
        
        setvar_plmsseason(value);
        setisloading(true);
        setds_bomlist([]);

        const sendOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "seasonid" : value , 
              "token" : var_plmsession})
        };

        await fetch(`${apiurl}/plmaccess/plmapperalboms`,sendOptions)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_bomlist(response.Dataset);
              setisloading(false);
              notification['success']({
                message: 'Success Notification',
                description:`${response.Dataset.length} No of Bom Versions are loading.` ,
                style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
              });
            }
            else
            {
              setisloading(false);
                notification['error']({
                    message: 'Data Error',
                    description: 'Can not Access PLM.',
                    style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                  });
            }

            
        })
        .catch(error => {
          setisloading(false);
            notification['error']({
                message: 'Data Error',
                description: error,
                style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
              });

        });
        
      }

      function handleChangeBom(value) 
      {
        setvar_btngetbom(false);
        setvar_plmrevbom(value);
      }

      async function GetBom()
      {
        if(var_plmrevbom === "")
        {
          notification['error']({
            message: 'Error',
            description: 'PLM Revise BOM is Not Found.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          setisloading(true);

          const sendOptions_1 = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "revbomid" : var_plmrevbom , 
                "token" : var_plmsession})
          };

          await fetch(`${apiurl}/plmaccess/plmbomdata`,sendOptions_1)
          .then(res_1 => res_1.json())
          .then(response_1 => { 

              if(response_1.Type === "SUCCESS")
              {
                  setds_plm_bomfull(response_1.Dataset);
                  setds_plm_bomcolors(response_1.colorways);

                  const sendOptions_2 = {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "itemlistids" : response_1.Dataset.items , 
                        "token" : var_plmsession})
                  };
                  
                  fetch(`${apiurl}/plmaccess/getbomitems`,sendOptions_2)
                  .then(res_2 => res_2.json())
                  .then(response_2 =>
                    {
                      if(response_2.Type === "SUCCESS")
                      {
                        notification['success']({
                          message: 'Success Notification',
                          description:`BOM Items Loading Completed.` ,
                          style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                        });

                        const sendOptions_3 = {
                          method: 'post',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                              "fabric_yyid" : fabyyid , 
                              "colorset" : response_1.colorways})
                        };
                        
                        fetch(`${apiurl}/fabricyy/addplmcolordata`,sendOptions_3)
                        .then(res_3 => res_3.json())
                        .then(response_3 => 
                          {
                            if(response_3.Type === "SUCCESS")
                            {
                              notification['success']({
                                message: 'Success Notification',
                                description:`Data Sync Completed.` ,
                                style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                              });
                              

                              const sendOptions_4 = {
                                method: 'post',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    "fabric_yyid" : fabyyid , 
                                    "itemset" : response_2.Dataset,
                                    "token":var_plmsession})
                              };
                              
                              fetch(`${apiurl}/fabricyy/addplmitemdata`,sendOptions_4)
                              .then(res_4 => res_4.json())
                              .then(response_4 => 
                                {
                                  if(response_4.Type === "SUCCESS")
                                  {
                                    notification['success']({
                                      message: 'Success Notification',
                                      description:response_4.Message ,
                                      style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                                    });
                                    setisloading(false);
                                    
                                  }
                                })
            
                              
                            }
                          })
      
                        
                      }
                    })

                  
                  
                  
              }
              else
              {
                setisloading(false);
                  notification['error']({
                      message: 'Data Error',
                      description: 'Data Loading Error.',
                      style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                    });
              }

              
          })
          .catch(error_1 => {
            setisloading(false);
              notification['error']({
                  message: 'Data Error',
                  description: error_1,
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });

          }); 
        }

        
      }

    return( <Layout style={{ minHeight: '100vh' }}>
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>FAB YY</Breadcrumb.Item>
          <Breadcrumb.Item>Update Fabric YY Project</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>

            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} >
              <Panel header="Fabric YY Details" key="1">
                <Row>
                  <Col span={8}>
                    <Typography.Text strong style={{color:"blue"}}>Buyer Category :</Typography.Text>
                    <p><b>{var_customer}</b></p>
                    
                    <Typography.Text strong style={{color:"blue"}}>Factory :</Typography.Text>
                    <p><b>{var_factory}</b></p>

                    <Typography.Text strong style={{color:"blue"}}>Create Date :</Typography.Text>
                    <p><b>{var_crdate}</b></p>
                    
                  </Col>
                  <Col span={8}>

                  <Typography.Text strong style={{color:"blue"}}>Customer Style No :</Typography.Text>
                  <p><b>{var_styleno}</b></p>
                  
                  <Typography.Text strong style={{color:"blue"}}>Customer M3 Style No :</Typography.Text>
                  <p><b>{var_m3styleno}</b></p>
                  
                  <Typography.Text strong style={{color:"blue"}}>Previous Style No :</Typography.Text>
                  <p><b>{var_oldstyleno}</b></p>
                 
                  </Col>
                  <Col span={8}>

                  </Col>
                </Row>
               
              </Panel>
            </Collapse>
 
            </Col>
          </Row>
          <Row>
            <Col span={6}>

            <Modal isOpen={isloading} style={customStyles} contentLabel="Example Modal">
              <ScaleLoader color={'#9013FE'} loading={true} height={55} width={6} radius={10} margin={8}/>
              <br/>
              <p style={{color:"#9013FE"}}>Please Wait......</p>
            </Modal>

              <p style={{color:"red"}}>** Click Here To Upload OLR File</p>

              <div id="upload-box">
                <Input type="file" onChange={handleUploadOLR} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                <p><b>Filename:</b> {fileOLR.name}</p>
              </div>

              <hr/>

              <p style={{color:"red"}}>** Click Here To Get PLM BOM Data</p>
              <p style={{color:"purple"}}>PLM Style Number</p>
              <Input onChange={plmstyleonchange} type="text" style={{width:"80%"}}/>
              <Tooltip title="Get Data From PLM">
                <Button style={{marginLeft:"5px"}} type="primary" onClick={getPLMSeasonList} shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              
              <p style={{color:"purple"}}>Select Season</p>

              <Select style={{ width:"100%" }} disabled={var_drpseason} onChange={handleChangeSeason}>
              {
                ds_seasonlist.map((row) => <Option value={row.idstyle}>{row.fs}</Option>)
              }
              </Select>

              <p style={{color:"purple"}}>Select Bom version</p>

              <Select style={{ width:"100%" }} disabled={var_drpseason} onChange={handleChangeBom}>
              {
                ds_bomlist.map((row) => <Option value={row.latest_revision}>{row.node_name}</Option>)
              } 
              </Select>

              <Button onClick={GetBom} type="primary" icon={<CloudDownloadOutlined />} disabled={var_btngetbom}> Get PLM BOMs </Button>
               
            </Col>
            <Col span={18}></Col>
          </Row>
          
          

        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default CreateNew;

