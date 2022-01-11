import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, Tooltip, Select, Input, Button, notification, Collapse,Modal as AntdDModal, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import { CaretRightOutlined,CloudDownloadOutlined,SearchOutlined,CalendarTwoTone,EditTwoTone,SaveFilled  } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';
import ScaleLoader from "react-spinners/ScaleLoader";
import Modal from 'react-modal';
import moment from 'moment';

function CreateNew() 
{
    const {Content} = Layout;
    const { Panel } = Collapse;
    const { Option } = Select;

    const dateFormat = 'YYYY/MM/DD';
        
    var apiurl = localStorage.getItem('session_api');
    var username = localStorage.getItem('session_username');
    const [fabyyid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [var_customer, setvar_customer] = React.useState("");
    const [var_styleno, setvar_styleno] = React.useState("");
    const [var_m3styleno, setvar_m3styleno] = React.useState("");
    const [var_oldstyleno, setvar_oldstyleno] = React.useState("");
    const [var_factory, setvar_factory] = React.useState("");
    const [var_crdate, setvar_crdate] = React.useState("");
    const [var_plm_style, setvar_plm_style] = React.useState("");
    const [var_plm_season, setvar_plm_season] = React.useState("");
    const [var_plm_bom, setvar_plm_bom] = React.useState("");

    const [var_btngetbom, setvar_btngetbom] = React.useState(true);
    const [var_drpseason, setvar_drpseason] = React.useState(true);
    const [isloading, setisloading] = React.useState(false);
    const [isOpenOrder1, setisOpenOrder1] = React.useState(false);
    const [isOpenOrder2, setisOpenOrder2] = React.useState(false);
    const [isOpenOrder3, setisOpenOrder3] = React.useState(false);
    const [isOpenOrder4, setisOpenOrder4] = React.useState(false);
    const [isOpenBomItem, setisOpenBomItem] = React.useState(false);
    const [isOpenSizeItem, setisOpenSizeItem] = React.useState(false);

    const [sel_Size_Id, setsel_Size_Id] = React.useState("");
    const [sel_Size_Gmtway, setsel_Size_Gmtway] = React.useState("");
    const [sel_Size_Plant, setsel_Size_Plant] = React.useState("");

    const [val_Size_Graphic, setval_Size_Graphic] = React.useState("");
    const [val_Size_Wash, setval_Size_Wash] = React.useState("");
    const [val_Size_Color, setval_Size_Color] = React.useState("");
    const [val_Size_Gmtway, setval_Size_Gmtway] = React.useState("");
    const [val_Size_ProPlant, setval_Size_ProPlant] = React.useState("");

    const [sel_Bom_Id, setsel_Bom_Id] = React.useState("");
    const [sel_Bom_Desc, setsel_Bom_Desc] = React.useState("");
    const [sel_Bom_Supplier, setsel_Bom_Supplier] = React.useState("");
    const [sel_Bom_Fabtype, setsel_Bom_Fabtype] = React.useState("");
    const [sel_Bom_Placement, setsel_Bom_Placement] = React.useState("");
    const [sel_Bom_Color, setsel_Bom_Color] = React.useState("");
    const [sel_Bom_Comments, setsel_Bom_Comments] = React.useState("");
    const [sel_Bom_Price, setsel_Bom_Price] = React.useState("");
    const [sel_Bom_Order1, setsel_Bom_Order1] = React.useState("");
    const [sel_Bom_Order2, setsel_Bom_Order2] = React.useState("");
    const [sel_Bom_Order3, setsel_Bom_Order3] = React.useState("");
    const [sel_Bom_Order4, setsel_Bom_Order4] = React.useState("");

    const [val_price, setval_price] = React.useState("");
    const [val_comment, setval_comment] = React.useState("");
    const [val_order1, setval_order1] = React.useState("");
    const [val_order2, setval_order2] = React.useState("");
    const [val_order3, setval_order3] = React.useState("");
    const [val_order4, setval_order4] = React.useState("");

    const [dateOrder1, setdateOrder1] = React.useState(new Date());
    const [dateOrder2, setdateOrder2] = React.useState(new Date());
    const [dateOrder3, setdateOrder3] = React.useState(new Date());
    const [dateOrder4, setdateOrder4] = React.useState(new Date());

    const [ds_seasonlist,setds_seasonlist] = React.useState([]);
    const [ds_bomlist,setds_bomlist] = React.useState([]);

    const [ds_plm_bomfull,setds_plm_bomfull] = React.useState([]);
    const [ds_factory,setds_factory] = React.useState([]);

    const [ds_olr_colorset,setds_olr_colorset] = React.useState([]);
    const [ds_olr_sizeset,setds_olr_sizeset] = React.useState([]);
    const [ds_olr_sizelength,setds_olr_sizelength] = React.useState(0);

    const [fileOLR, setFileOLR] = React.useState("");

    const [var_plmsession, setvar_plmsession] = React.useState("");
    const [var_plmstyle, setvar_plmstyle] = React.useState("");
    const [var_plmsseasonID, setvar_plmsseasonID] = React.useState("");
    const [var_plmrevbom, setvar_plmrevbom] = React.useState("");
    const [var_plmrevbomID, setvar_plmrevbomID] = React.useState("");

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
              setvar_customer(response.Data[0].cus_name);
              setvar_styleno(response.Data[0].cus_sty_no);
              setvar_m3styleno(response.Data[0].m3_sty_no);
              setvar_oldstyleno(response.Data[0].old_sty_no);
              setvar_factory(response.Data[0].fac_name);
              setvar_crdate(response.Data[0].create_ts);

              setvar_plm_style(response.Data[0].plm_style);
              setvar_plm_season(response.Data[0].plm_seasonname);
              setvar_plm_bom(response.Data[0].plm_bomname);
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

      fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
      .then(res_5 => res_5.json())
      .then(response_5 => 
        {
          if(response_5.Type === "SUCCESS")
          {
            setds_plm_bomfull(response_5.Data);
            
          }
        })

        fetch(`${apiurl}/fabricyy/getolrsizes/${fabyyid}`)
        .then(res_5 => res_5.json())
        .then(response_5 => 
          {
            if(response_5.Type === "SUCCESS")
            {
              setds_olr_sizeset(response_5.Data); 
              setds_olr_sizelength(response_5.Data.length);
            }
          })

          fetch(`${apiurl}/fabricyy/getolrdata/${fabyyid}`)
        .then(res_5 => res_5.json())
        .then(response_5 => 
          {
            if(response_5.Type === "SUCCESS")
            {
              setds_olr_colorset(response_5.Data);
              
            }
          })

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

    },[apiurl,username,fabyyid])
 
      async function handleUploadOLR(event) {
        
        setisloading(true);
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
                    OLRITEMS.push({CUSTNAME: items[1],MASTSTYLEDESC: items[30],CUSTSTYLE: items[31],CUSTSTYLEDESC: items[32],MASTCOLORDESC: items[34],CUSTSIZEDESC: items[40],ORDERQTY: items[41],SEASON: items[62]})
                   
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
                     
                      fetch(`${apiurl}/fabricyy/olritemprocess/${fabyyid}`)
                      .then(res_1 => res_1.json())
                      .then(response_1 => { 
                
                          if(response_1.Type === "SUCCESS")
                          {
                            fetch(`${apiurl}/fabricyy/olrlineprocess/${fabyyid}`)
                            .then(res_2 => res_2.json())
                            .then(response_2 => { 
                      
                                if(response_2.Type === "SUCCESS")
                                {
                                    fetch(`${apiurl}/fabricyy/getolrsizes/${fabyyid}`)
                                    .then(res_3 => res_3.json())
                                    .then(response_3 => { 
                              
                                        if(response_3.Type === "SUCCESS")
                                        {
                                          setds_olr_sizeset(response_3.Data);
                                          setds_olr_sizelength(response_3.Data.length);

                                            fetch(`${apiurl}/fabricyy/getolrdata/${fabyyid}`)
                                            .then(res_4 => res_4.json())
                                            .then(response_4 => { 
                                      
                                                if(response_4.Type === "SUCCESS")
                                                {
                                                  setds_olr_colorset(response_4.Data);

                                                    setisloading(false);
                                                    
                                                    notification['success']({
                                                      message: 'Data Success',
                                                      description: 'OLR Data Processing Completed.',
                                                      style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                                                    }); 
                                                }
                                                else
                                                {
                                                  setisloading(false);

                                                    notification['error']({
                                                        message: 'Data Error',
                                                        description: "Error in OLR Data Processing",
                                                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                                                      });
                            
                                                }
                                            })

                                        }
                                        else
                                        {
                                          setisloading(false);

                                            notification['error']({
                                                message: 'Data Error',
                                                description: "Error in OLR Data Processing",
                                                style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                                              });
                    
                                        }
                                    })

                                }
                                else
                                {
                                  setisloading(false);

                                    notification['error']({
                                        message: 'Data Error',
                                        description: "Error in OLR Data Processing",
                                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                                      });
            
                                }
                            })

                          }
                          else
                          {
                            setisloading(false);

                              notification['error']({
                                  message: 'Data Error',
                                  description: "Error in OLR Data Processing",
                                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                                });
      
                          }
                      })

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

      const onChangeGw = (e) => {
        setsel_Size_Gmtway(e.target.value);
      }

      const onChangePrice = (e) => {
        setval_price(e.target.value);
      } 

      async function updateprice()
      {
        if(sel_Bom_Id === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Line Can not Identifired.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else if(val_price === "")
        {
          notification['error']({
            message: 'Error',
            description: 'Price Value Can not be null or Empty.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "itemid" : sel_Bom_Id, 
                "value" : val_price,
                "datafield" : "PRICE"
            })
          };
        
          await fetch(`${apiurl}/fabricyy/updatebomitemdata`,sendOptions)
          .then(res => res.json())
          .then(response => { 
    
              if(response.Type === "SUCCESS")
              {

                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  }).catch(error_1 => {
        
                    notification['error']({
                        message: 'Data Error',
                        description: error_1,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      });
      
                }); 

                  fetch(`${apiurl}/fabricyy/getiteminbom/${sel_Bom_Id}`)
                  .then(res_1 => res_1.json())
                  .then(response_1 => { 
        
                      if(response_1.Type === "SUCCESS")
                      {
                          if(response_1.Data.length === 1)
                          {
                            setsel_Bom_Comments(response_1.Data[0].item_comment);
                            setsel_Bom_Price(response_1.Data[0].item_price);
                            setsel_Bom_Order1(response_1.Data[0].item_ordering);
                            setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                            setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                            setsel_Bom_Order4(response_1.Data[0].item_order_rev3);
                          }
                          
                          
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
        
                      notification['error']({
                          message: 'Data Error',
                          description: error_1,
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
        
                  }); 

                notification['success']({
                  message: 'Data Success',
                  description: response.Msg,
                  style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                }); 
              }
              else
              {

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
      }

      const onChangeComment = (e) => {
        setval_comment(e.target.value);
      }

      async function updatecomment()
      {
        if(sel_Bom_Id === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Line Can not Identifired.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "itemid" : sel_Bom_Id, 
                "value" : val_comment,
                "datafield" : "COMMENT"
            })
          };
        
          await fetch(`${apiurl}/fabricyy/updatebomitemdata`,sendOptions)
          .then(res => res.json())
          .then(response => { 
    
              if(response.Type === "SUCCESS")
              {

                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  }).catch(error_1 => {
        
                    notification['error']({
                        message: 'Data Error',
                        description: error_1,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      });
      
                }); 

                  fetch(`${apiurl}/fabricyy/getiteminbom/${sel_Bom_Id}`)
                  .then(res_1 => res_1.json())
                  .then(response_1 => { 
        
                      if(response_1.Type === "SUCCESS")
                      {
                          if(response_1.Data.length === 1)
                          {
                            setsel_Bom_Comments(response_1.Data[0].item_comment);
                            setsel_Bom_Price(response_1.Data[0].item_price);
                            setsel_Bom_Order1(response_1.Data[0].item_ordering);
                            setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                            setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                            setsel_Bom_Order4(response_1.Data[0].item_order_rev3);
                          } 
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
        
                      notification['error']({
                          message: 'Data Error',
                          description: error_1,
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
        
                  }); 

                notification['success']({
                  message: 'Data Success',
                  description: response.Msg,
                  style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                }); 
              }
              else
              {

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
      }

      async function updateorder1()
      {
        if(sel_Bom_Id === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Line Can not Identifired.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "itemid" : sel_Bom_Id, 
                "value" : val_order1,
                "datafield" : "ORDER1"
            })
          };
        
          await fetch(`${apiurl}/fabricyy/updatebomitemdata`,sendOptions)
          .then(res => res.json())
          .then(response => { 
    
              if(response.Type === "SUCCESS")
              {

                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  }).catch(error_1 => {
        
                    notification['error']({
                        message: 'Data Error',
                        description: error_1,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      });
      
                }); 

                  fetch(`${apiurl}/fabricyy/getiteminbom/${sel_Bom_Id}`)
                  .then(res_1 => res_1.json())
                  .then(response_1 => { 
        
                      if(response_1.Type === "SUCCESS")
                      {
                          if(response_1.Data.length === 1)
                          {
                            setsel_Bom_Comments(response_1.Data[0].item_comment);
                            setsel_Bom_Price(response_1.Data[0].item_price);
                            setsel_Bom_Order1(response_1.Data[0].item_ordering);
                            setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                            setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                            setsel_Bom_Order4(response_1.Data[0].item_order_rev3);
                          } 
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
        
                      notification['error']({
                          message: 'Data Error',
                          description: error_1,
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
        
                  }); 

                notification['success']({
                  message: 'Data Success',
                  description: response.Msg,
                  style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                }); 
              }
              else
              {

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
      }

      async function updateorder2()
      {
        if(sel_Bom_Id === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Line Can not Identifired.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "itemid" : sel_Bom_Id, 
                "value" : val_order2,
                "datafield" : "ORDER2"
            })
          };
        
          await fetch(`${apiurl}/fabricyy/updatebomitemdata`,sendOptions)
          .then(res => res.json())
          .then(response => { 
    
              if(response.Type === "SUCCESS")
              {

                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  }).catch(error_1 => {
        
                    notification['error']({
                        message: 'Data Error',
                        description: error_1,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      });
      
                }); 

                  fetch(`${apiurl}/fabricyy/getiteminbom/${sel_Bom_Id}`)
                  .then(res_1 => res_1.json())
                  .then(response_1 => { 
        
                      if(response_1.Type === "SUCCESS")
                      {
                          if(response_1.Data.length === 1)
                          {
                            setsel_Bom_Comments(response_1.Data[0].item_comment);
                            setsel_Bom_Price(response_1.Data[0].item_price);
                            setsel_Bom_Order1(response_1.Data[0].item_ordering);
                            setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                            setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                            setsel_Bom_Order4(response_1.Data[0].item_order_rev3);
                          } 
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
        
                      notification['error']({
                          message: 'Data Error',
                          description: error_1,
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
        
                  }); 

                notification['success']({
                  message: 'Data Success',
                  description: response.Msg,
                  style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                }); 
              }
              else
              {

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
      }

      async function updateorder3()
      {
        if(sel_Bom_Id === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Line Can not Identifired.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "itemid" : sel_Bom_Id, 
                "value" : val_order3,
                "datafield" : "ORDER3"
            })
          };
        
          await fetch(`${apiurl}/fabricyy/updatebomitemdata`,sendOptions)
          .then(res => res.json())
          .then(response => { 
    
              if(response.Type === "SUCCESS")
              {

                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  }).catch(error_1 => {
        
                    notification['error']({
                        message: 'Data Error',
                        description: error_1,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      });
      
                }); 

                  fetch(`${apiurl}/fabricyy/getiteminbom/${sel_Bom_Id}`)
                  .then(res_1 => res_1.json())
                  .then(response_1 => { 
        
                      if(response_1.Type === "SUCCESS")
                      {
                          if(response_1.Data.length === 1)
                          {
                            setsel_Bom_Comments(response_1.Data[0].item_comment);
                            setsel_Bom_Price(response_1.Data[0].item_price);
                            setsel_Bom_Order1(response_1.Data[0].item_ordering);
                            setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                            setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                            setsel_Bom_Order4(response_1.Data[0].item_order_rev3);
                          } 
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
        
                      notification['error']({
                          message: 'Data Error',
                          description: error_1,
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
        
                  }); 

                notification['success']({
                  message: 'Data Success',
                  description: response.Msg,
                  style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                }); 
              }
              else
              {

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
      }

      async function updateorder4()
      {
        if(sel_Bom_Id === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Line Can not Identifired.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "itemid" : sel_Bom_Id, 
                "value" : val_order4,
                "datafield" : "ORDER4"
            })
          };
        
          await fetch(`${apiurl}/fabricyy/updatebomitemdata`,sendOptions)
          .then(res => res.json())
          .then(response => { 
    
              if(response.Type === "SUCCESS")
              {

                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  }).catch(error_1 => {
        
                    notification['error']({
                        message: 'Data Error',
                        description: error_1,
                        style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                      });
      
                }); 

                  fetch(`${apiurl}/fabricyy/getiteminbom/${sel_Bom_Id}`)
                  .then(res_1 => res_1.json())
                  .then(response_1 => { 
        
                      if(response_1.Type === "SUCCESS")
                      {
                          if(response_1.Data.length === 1)
                          {
                            setsel_Bom_Comments(response_1.Data[0].item_comment);
                            setsel_Bom_Price(response_1.Data[0].item_price);
                            setsel_Bom_Order1(response_1.Data[0].item_ordering);
                            setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                            setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                            setsel_Bom_Order4(response_1.Data[0].item_order_rev3);
                          } 
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
        
                      notification['error']({
                          message: 'Data Error',
                          description: error_1,
                          style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                        });
        
                  }); 

                notification['success']({
                  message: 'Data Success',
                  description: response.Msg,
                  style:{color: '#000',border: '1px solid #2ecc71',backgroundColor: '#d5f5e3'},
                }); 
              }
              else
              {

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
      }

      function handleChangeFactory(value) {
        setsel_Size_Plant(value);
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
        
        setvar_plmsseasonID(value.split('-')[1]);
        
        setisloading(true);
        setds_bomlist([]);

        const sendOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "seasonid" : value.split('-')[0] , 
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
        setvar_plmrevbom(value.split('-')[0]);
        setvar_plmrevbomID(value.split('-')[1]);
      }

      function createplmbomrow(rowvalue)
      {
        return(
            <tr style={{width:"10%",borderLeftStyle:"solid",borderLeftWidth:"1px",borderRightStyle:"solid",borderRightWidth:"1px",borderBottomStyle:"solid",borderBottomWidth:"1px"}}>
              <td>{rowvalue.plm_item_desc}</td>
              <td>{rowvalue.item_comment}</td>
              <td>{rowvalue.plm_supplier}</td>
              <td>{rowvalue.plm_colorway_type}</td>
              <td>{rowvalue.plm_cw}</td>
              <td>{rowvalue.plm_placement}</td>
              <td>{rowvalue.plm_color}</td>
              <td><EditTwoTone onClick={() => GetBomItemforEdit(rowvalue.item_id)} style={{fontSize:"20px",cursor:"pointer"}} twoToneColor="#FFBF00" /></td>
              <td>{rowvalue.item_price}</td>
              <td>{rowvalue.item_ordering}</td>
              <td>{rowvalue.item_order_rev1}</td>
              <td>{rowvalue.item_order_rev2}</td>
              <td>{rowvalue.item_order_rev3}</td>
            </tr>
        );
      }
      
      function createolrtbrow(row_value)
      {

        var indents = [];
        for (var i = 1; i <= ds_olr_sizelength; i++) {
          indents.push(row_value[`s${i}_qty`]);
        }
        
        
        return(
            <tr style={{width:"10%",borderLeftStyle:"solid",borderLeftWidth:"1px",borderRightStyle:"solid",borderRightWidth:"1px",borderBottomStyle:"solid",borderBottomWidth:"1px"}}>
              <td>{row_value.graphic}</td>
              <td>{row_value.wash_dye}</td>
              <td><EditTwoTone onClick={() => GetSizeItemforEdit(row_value.olr_item_id)} style={{fontSize:"15px",cursor:"pointer"}} twoToneColor="#FFBF00" /></td>
              <td>{row_value.garmentway}</td>
              <td>{row_value.color}</td>
              <td>{row_value.flex}</td>
              {indents.map((row_tb) =><td>{row_tb}</td>)}
              <td>{row_value.sub_total}</td>
              <td>{row_value.prod_plant}</td>
            </tr>
        );
      } 


      function createolrheadrow()
      {
        return(
          <>
          <tr>
            <th><button>Sync</button></th>
            <th><button>Sync</button></th>
            <th colSpan={ds_olr_sizelength + 7}></th>
          </tr>
          <tr>
          <th style={{width:"150px",borderStyle:"solid",borderWidth:"1px"}}>GRAPHIC</th>
          <th style={{width:"150px",borderStyle:"solid",borderWidth:"1px"}}>WASH/DYE</th>
          <th style={{width:"50px",borderStyle:"solid",borderWidth:"1px"}}>#</th>
          <th style={{width:"150px",borderStyle:"solid",borderWidth:"1px"}}>GARMENT WAY</th>
          <th style={{width:"150px",borderStyle:"solid",borderWidth:"1px"}}>COLOR</th>
          <th style={{width:"50px",borderStyle:"solid",borderWidth:"1px"}}>FLEX</th>
          {
            ds_olr_sizeset.map((row_tb) =><th style={{width:"75px",borderStyle:"solid",borderWidth:"1px"}}>{row_tb.sizename}</th>)
          }
          <th style={{width:"150px",borderStyle:"solid",borderWidth:"1px"}}>TOTAL</th>
          <th style={{width:"150px",borderStyle:"solid",borderWidth:"1px"}}>PLANT</th>
        </tr>
        </>
        );
      } 

      const handleOkOrder1 = async () => {
        
        if(moment(dateOrder1).isValid() === true)
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fabric_yyid" : fabyyid , 
                "orderdate" : dateOrder1,
                "daterev" : "ORDER1"})
          };
  
          await fetch(`${apiurl}/fabricyy/updateorderdate`,sendOptions)
          .then(res => res.json())
          .then(response => { 
  
              if(response.Type === "SUCCESS")
              {
                
                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  })

                setisOpenOrder1(false);
                notification['success']({
                  message: 'Success Notification',
                  description:`Ordering Date Update in All Bom Items.` ,
                  style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                });
              }
              else
              {
                  notification['error']({
                      message: 'Data Error',
                      description: 'Please Try Again.',
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
        }
        else
        {
          notification['error']({
            message: 'Date Error',
            description: 'Please Select Correct Date.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
        }
      };

      const handleOkOrder2 = async () => {
        
        if(moment(dateOrder2).isValid() === true)
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fabric_yyid" : fabyyid , 
                "orderdate" : dateOrder2,
                "daterev" : "ORDER2"})
          };
  
          await fetch(`${apiurl}/fabricyy/updateorderdate`,sendOptions)
          .then(res => res.json())
          .then(response => { 
  
              if(response.Type === "SUCCESS")
              {
                
                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  })

                setisOpenOrder2(false);
                notification['success']({
                  message: 'Success Notification',
                  description:`Revised Ordering 1 Date Update in All Bom Items.` ,
                  style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                });
              }
              else
              {
                  notification['error']({
                      message: 'Data Error',
                      description: 'Please Try Again.',
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
        }
        else
        {
          notification['error']({
            message: 'Date Error',
            description: 'Please Select Correct Date.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
        }
      };

      const handleOkOrder3 = async () => {
        
        if(moment(dateOrder3).isValid() === true)
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fabric_yyid" : fabyyid , 
                "orderdate" : dateOrder3,
                "daterev" : "ORDER3"})
          };
  
          await fetch(`${apiurl}/fabricyy/updateorderdate`,sendOptions)
          .then(res => res.json())
          .then(response => { 
  
              if(response.Type === "SUCCESS")
              {
                
                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  })

                setisOpenOrder3(false);
                notification['success']({
                  message: 'Success Notification',
                  description:`Revised Ordering 2 Date Update in All Bom Items.` ,
                  style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                });
              }
              else
              {
                  notification['error']({
                      message: 'Data Error',
                      description: 'Please Try Again.',
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
        }
        else
        {
          notification['error']({
            message: 'Date Error',
            description: 'Please Select Correct Date.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
        }
      };

      const handleOkOrder4 = async () => {
        
        if(moment(dateOrder4).isValid() === true)
        {
          const sendOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fabric_yyid" : fabyyid , 
                "orderdate" : dateOrder4,
                "daterev" : "ORDER4"})
          };
  
          await fetch(`${apiurl}/fabricyy/updateorderdate`,sendOptions)
          .then(res => res.json())
          .then(response => { 
  
              if(response.Type === "SUCCESS")
              {
                
                fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                .then(res_5 => res_5.json())
                .then(response_5 => 
                  {
                    if(response_5.Type === "SUCCESS")
                    {
                      setds_plm_bomfull(response_5.Data);
                      
                    }
                  })

                setisOpenOrder4(false);
                notification['success']({
                  message: 'Success Notification',
                  description:`Revised Ordering 3 Date Update in All Bom Items.` ,
                  style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                });
              }
              else
              {
                  notification['error']({
                      message: 'Data Error',
                      description: 'Please Try Again.',
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
        }
        else
        {
          notification['error']({
            message: 'Date Error',
            description: 'Please Select Correct Date.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
        }
      };

      function onChangeOrderOne(date, dateString) {
        setdateOrder1(dateString);
      }

      function onChangeOrderTwo(date, dateString) {
        setdateOrder2(dateString);
      }

      function onChangeOrderThree(date, dateString) {
        setdateOrder3(dateString);
      }

      function onChangeOrderFour(date, dateString) {
        setdateOrder4(dateString);
      }

      function onChange_Update_Order1(date, dateString) {
        setval_order1(dateString);
      }

      function onChange_Update_Order2(date, dateString) {
        setval_order2(dateString);
      }

      function onChange_Update_Order3(date, dateString) {
        setval_order3(dateString);
      }

      function onChange_Update_Order4(date, dateString) {
        setval_order4(dateString);
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
  
            let first = await fetch(`${apiurl}/plmaccess/plmbomdata`,sendOptions_1)
            .then(res_1 => res_1.json())
            .then(response_1 => { 
  
                if(response_1.Type === "SUCCESS")
                {
  
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

                                      const sendOptions_plmtoyy = {
                                        method: 'post',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            "fabric_yyid" : fabyyid , 
                                            "plmstyleid" : var_plmstyle , 
                                            "plmseasonid" : var_plmsseasonID , 
                                            "plmbomid" : var_plmrevbomID , 
                                            "token" : var_plmsession})
                                      };

                                      fetch(`${apiurl}/fabricyy/updateyyplmdata`,sendOptions_plmtoyy)
                                      .then(res_plmtoyy => res_plmtoyy.json())
                                      .then(response_plmtoyy =>
                                        {

                                          notification['success']({
                                            message: 'Success Notification',
                                            description:'PLM BOM Items Loading Completed.' ,
                                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                                          });
    
                                          fetch(`${apiurl}/fabricyy/getplmitemsindb/${fabyyid}`)
                                          .then(res_5 => res_5.json())
                                          .then(response_5 => 
                                            {
                                              if(response_5.Type === "SUCCESS")
                                              {
                                                setds_plm_bomfull(response_5.Data);
                                                
                                                setisloading(false);
                                                
                                              }
                                            })

                                        })

                                      
                                      
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


      async function GetBomItemforEdit(value)
      {
        if(value === "")
        {
          notification['error']({
            message: 'Error',
            description: 'BOM Id is Not Found.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          

          await fetch(`${apiurl}/fabricyy/getiteminbom/${value}`)
          .then(res_1 => res_1.json())
          .then(response_1 => { 

              if(response_1.Type === "SUCCESS")
              {
                  if(response_1.Data.length === 1)
                  {
                    setsel_Bom_Id(response_1.Data[0].item_id);
                    setsel_Bom_Desc(response_1.Data[0].plm_item_desc);
                    setsel_Bom_Supplier(response_1.Data[0].plm_supplier);
                    setsel_Bom_Fabtype(response_1.Data[0].plm_colorway_type);
                    setsel_Bom_Placement(response_1.Data[0].plm_placement);
                    setsel_Bom_Color(response_1.Data[0].plm_color);
                    setsel_Bom_Comments(response_1.Data[0].item_comment);
                    setsel_Bom_Price(response_1.Data[0].item_price);
                    setsel_Bom_Order1(response_1.Data[0].item_ordering);
                    setsel_Bom_Order2(response_1.Data[0].item_order_rev1);
                    setsel_Bom_Order3(response_1.Data[0].item_order_rev2);
                    setsel_Bom_Order4(response_1.Data[0].item_order_rev3);

                    setval_price(response_1.Data[0].item_price);
                    setval_comment(response_1.Data[0].item_comment);

                    if(response_1.Data[0].item_ordering !== null){
                    setval_order1(response_1.Data[0].item_ordering);} else {setval_order1(new Date());}

                    if(response_1.Data[0].item_order_rev1 !== null){
                    setval_order2(response_1.Data[0].item_order_rev1);} else {setval_order2(new Date())}

                    if(response_1.Data[0].item_order_rev2 !== null){
                    setval_order3(response_1.Data[0].item_order_rev2);} else {setval_order3(new Date())}

                    if(response_1.Data[0].item_order_rev3 !== null){
                    setval_order4(response_1.Data[0].item_order_rev3);} else {setval_order4(new Date())}

                    setisOpenBomItem(true);
                  }
                  
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

              notification['error']({
                  message: 'Data Error',
                  description: error_1,
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });

          }); 
        }

        
      }

      async function GetSizeItemforEdit(value)
      {
        if(value === "")
        {
          notification['error']({
            message: 'Error',
            description: 'Selected Size is Not Found.',
            style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
          });
          return;
        }
        else
        {
          

          await fetch(`${apiurl}/fabricyy/getsizeinbom/${value}`)
          .then(res_1 => res_1.json())
          .then(response_1 => { 

              if(response_1.Type === "SUCCESS")
              {
                  if(response_1.Data.length === 1)
                  {
                    setsel_Size_Id(response_1.Data[0].olr_item_id);
                    setsel_Size_Gmtway(response_1.Data[0].garmentway);
                    setsel_Size_Plant(response_1.Data[0].prod_plant);

                    setval_Size_Graphic(response_1.Data[0].graphic);
                    setval_Size_Wash(response_1.Data[0].wash_dye);
                    setval_Size_Color(response_1.Data[0].color);
                    setval_Size_Gmtway(response_1.Data[0].garmentway);
                    setval_Size_ProPlant(response_1.Data[0].prod_plant);

                    setisOpenSizeItem(true);
                  }
                  
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

              notification['error']({
                  message: 'Data Error',
                  description: error_1,
                  style:{color: '#000',border: '1px solid #ff6961',backgroundColor: '#ffa39e'},
                });

          }); 
        }

        
      }

      const handleClickSaveSize = async () =>{

        const sendOptions_1 = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "itemid" : sel_Size_Id , 
              "gw" : sel_Size_Gmtway,
              "plant" : sel_Size_Plant})
        };

        await fetch(`${apiurl}/fabricyy/updatesizeitemdata`,sendOptions_1)
        .then(res_1 => res_1.json())
        .then(response_1 => { 

            if(response_1.Type === "SUCCESS")
            {

              notification['success']({
                message: 'Success Notification',
                description:'Size Item Update Completed.' ,
                style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
              });

              fetch(`${apiurl}/fabricyy/getolrsizes/${fabyyid}`)
              .then(res_5 => res_5.json())
              .then(response_5 => 
                {
                  if(response_5.Type === "SUCCESS")
                  {
                    setds_olr_sizeset(response_5.Data); 
                    setds_olr_sizelength(response_5.Data.length);
                  }
                })

                fetch(`${apiurl}/fabricyy/getolrdata/${fabyyid}`)
              .then(res_5 => res_5.json())
              .then(response_5 => 
                {
                  if(response_5.Type === "SUCCESS")
                  {
                    setds_olr_colorset(response_5.Data);
                    
                  }
                })

                setisOpenSizeItem(false);

            }
            else
            {
                setisOpenSizeItem(false);
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

      };

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
                  <Col span={4}>
                    <Typography.Text strong style={{color:"blue"}}>Buyer Category :</Typography.Text>
                    <p><b>{var_customer}</b></p>
                    
                    <Typography.Text strong style={{color:"blue"}}>Factory :</Typography.Text>
                    <p><b>{var_factory}</b></p>

                    <Typography.Text strong style={{color:"blue"}}>Create Date :</Typography.Text>
                    <p><b>{moment(var_crdate).format('YYYY/MM/DD')}</b></p>
                    
                  </Col>
                  <Col span={4}>

                    <Typography.Text strong style={{color:"blue"}}>Customer Style No :</Typography.Text>
                    <p><b>{var_styleno}</b></p>
                    
                    <Typography.Text strong style={{color:"blue"}}>Customer M3 Style No :</Typography.Text>
                    <p><b>{var_m3styleno}</b></p>
                    
                    <Typography.Text strong style={{color:"blue"}}>Previous Style No :</Typography.Text>
                    <p><b>{var_oldstyleno}</b></p>
                 
                  </Col>
                  <Col span={4}>

                    <Typography.Text strong style={{color:"blue"}}>PLM Style No :</Typography.Text>
                    <p><b>{var_plm_style}</b></p>
                    
                    <Typography.Text strong style={{color:"blue"}}>PLM Season :</Typography.Text>
                    <p><b>{var_plm_season}</b></p>
                    
                    <Typography.Text strong style={{color:"blue"}}>PLM Bom Version :</Typography.Text>
                    <p><b>{var_plm_bom}</b></p>
                 
                  </Col>
                  <Col span={5}>

                    <p style={{color:"red"}}>** Click Here To Upload OLR File</p>

                    <div id="upload-box">
                      <Input type="file" onChange={handleUploadOLR} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                      <p><b>Filename:</b> {fileOLR.name}</p>
                    </div>

                  </Col>
                  <Col span={5} style={{paddingLeft:"5px"}}>
                  <p style={{color:"red"}}>** Click Here To Get PLM BOM Data</p>
                  <p style={{color:"purple"}}>PLM Style Number</p>
                  <Input onChange={plmstyleonchange} type="text" style={{width:"80%"}}/>
                  <Tooltip title="Get Data From PLM">
                    <Button style={{marginLeft:"5px"}} type="primary" onClick={getPLMSeasonList} shape="circle" icon={<SearchOutlined />} />
                  </Tooltip>
                  
                  <p style={{color:"purple"}}>Select Season</p>

                  <Select style={{ width:"100%" }} disabled={var_drpseason} onChange={handleChangeSeason}>
                  {
                    ds_seasonlist.map((row) => <Option value={row.idstyle+'-'+row.idseason}>{row.fs}</Option>)
                  }
                  </Select>

                  <p style={{color:"purple"}}>Select Bom version</p>

                  <Select style={{ width:"100%" }} disabled={var_drpseason} onChange={handleChangeBom}>
                  {
                    ds_bomlist.map((row) => <Option value={row.latest_revision+'-'+row.id}>{row.node_name}</Option>)
                  } 
                  </Select>

                  <Button onClick={GetBom} type="primary" icon={<CloudDownloadOutlined />} disabled={var_btngetbom}> Get PLM BOMs </Button>
                  
                  </Col>
                </Row>
               
              </Panel>
            </Collapse>
 
            </Col>
          </Row>
          <Row>
            
            <Col span={24}>

            <Modal isOpen={isloading} style={customStyles} contentLabel="Example Modal">
              <ScaleLoader color={'#9013FE'} loading={true} height={55} width={6} radius={10} margin={8}/>
              <br/>
              <p style={{color:"#9013FE"}}>Please Wait......</p>
            </Modal>

            <table style={{marginLeft:"5px"}}>
              <thead style={{fontSize:"10px",textAlign:"center"}}>
                {
                  createolrheadrow()
                }  
              </thead>
              <tbody style={{fontSize:"10px",textAlign:"center",color:"black"}}>
                {
                  ds_olr_colorset.map((row_tb) => createolrtbrow(row_tb))
                } 
              </tbody>
            </table>


            <hr/>

            <table style={{marginLeft:"5px"}}>
              <thead style={{fontSize:"10px",textAlign:"center"}}>
                <tr>
                  <th colSpan={9}></th>
                  <th style={{width:"5%",fontSize:"20px"}}><CalendarTwoTone onClick={()=> setisOpenOrder1(true)} style={{cursor:"pointer"}} twoToneColor="#eb2f96" /></th>
                  <th style={{width:"5%",fontSize:"20px"}}><CalendarTwoTone onClick={()=> setisOpenOrder2(true)} style={{cursor:"pointer"}}  twoToneColor="#eb2f96" /></th>
                  <th style={{width:"5%",fontSize:"20px"}}><CalendarTwoTone onClick={()=> setisOpenOrder3(true)} style={{cursor:"pointer"}}  twoToneColor="#eb2f96" /></th>
                  <th style={{width:"5%",fontSize:"20px"}}><CalendarTwoTone onClick={()=> setisOpenOrder4(true)} style={{cursor:"pointer"}}  twoToneColor="#eb2f96" /></th>
                </tr>
                <tr>
                  <th style={{width:"10%",borderStyle:"solid",borderWidth:"1px"}}>FABRIC DESCRIPTION</th>
                  <th style={{width:"10%",borderStyle:"solid",borderWidth:"1px"}}>SPECIAL COMMENTS</th>
                  <th style={{width:"10%",borderStyle:"solid",borderWidth:"1px"}}>SUPPLIER</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>FABRIC TYPE</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>CUTTABLE WIDTH (INCHES)</th>
                  <th style={{width:"10%",borderStyle:"solid",borderWidth:"1px"}}>BODY PART / PLACEMENT</th>
                  <th style={{width:"10%",borderStyle:"solid",borderWidth:"1px"}}>COLOR CODE</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>#EDIT</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>PRICE</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>ORDERING</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>REVISED ORDERING 1</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>REVISED ORDERING 2</th>
                  <th style={{width:"5%",borderStyle:"solid",borderWidth:"1px"}}>REVISED ORDERING 3</th>
                </tr>
              </thead>
              <tbody style={{fontSize:"10px",textAlign:"center",color:"black"}}>
                {
                  ds_plm_bomfull.map((row) => createplmbomrow(row))
                } 
              </tbody>
            </table>
            <p style={{color:"purple",paddingLeft:"5px"}}>{ds_plm_bomfull.length.toString()} Items in PLM Bom</p>
            </Col>

            <AntdDModal visible={isOpenOrder1} title="Update All Ordering Dates" onOk={handleOkOrder1} onCancel={()=>setisOpenOrder1(false)}>
                <DatePicker Value={moment(dateOrder1, dateFormat)} format={dateFormat} onChange={onChangeOrderOne}/>
            </AntdDModal>

            <AntdDModal visible={isOpenOrder2} title="Update All Revised Ordering 1 Dates" onOk={handleOkOrder2} onCancel={()=>setisOpenOrder2(false)}>
                <DatePicker Value={moment(dateOrder2, dateFormat)} format={dateFormat} onChange={onChangeOrderTwo}/>
            </AntdDModal>

            <AntdDModal visible={isOpenOrder3} title="Update All Revised Ordering 2 Dates" onOk={handleOkOrder3} onCancel={()=>setisOpenOrder3(false)}>
                <DatePicker defaultValue={moment(dateOrder3, dateFormat)} format={dateFormat} onChange={onChangeOrderThree}/>
            </AntdDModal>

            <AntdDModal visible={isOpenOrder4} title="Update All Revised Ordering 3 Dates" onOk={handleOkOrder4} onCancel={()=>setisOpenOrder4(false)}>
                <DatePicker defaultValue={moment(dateOrder4, dateFormat)} format={dateFormat} onChange={onChangeOrderFour}/>
            </AntdDModal>

            <AntdDModal width={1000} visible={isOpenBomItem} title="Update BOM Item" okButtonProps={{ disabled: true,hidden:true }} onCancel={()=>setisOpenBomItem(false)}>
                <Row>
                  <Col span={10}>
                    <p style={{fontSize:"12px"}}><b>FABRIC DESCRIPTION : </b>{sel_Bom_Desc}</p>
                    <p style={{fontSize:"12px"}}><b>SUPPLIER : </b>{sel_Bom_Supplier}</p>
                    <p style={{fontSize:"12px"}}><b>FABRIC TYPE : </b>{sel_Bom_Fabtype}</p>
                    <p style={{fontSize:"12px"}}><b>BODY PART / PLACEMENT : </b>{sel_Bom_Placement}</p>
                    <p style={{fontSize:"12px"}}><b>COLOR CODE : </b>{sel_Bom_Color}</p>
                    <p style={{fontSize:"12px"}}><b>PRICE : </b>{sel_Bom_Price}</p>
                    <p style={{fontSize:"12px"}}><b>ORDERING : </b>{sel_Bom_Order1}</p>
                    <p style={{fontSize:"12px"}}><b>REVISED ORDERING 1 : </b>{sel_Bom_Order2}</p>
                    <p style={{fontSize:"12px"}}><b>REVISED ORDERING 2 : </b>{sel_Bom_Order3}</p>
                    <p style={{fontSize:"12px"}}><b>REVISED ORDERING 3 : </b>{sel_Bom_Order4}</p>
                    <p style={{fontSize:"12px"}}><b>COMMENT : </b>{sel_Bom_Comments}</p>
                  </Col>

                  <Col span={1}></Col>

                  <Col span={13}>
                    <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* PRICE</p>
                    <Input onChange={onChangePrice} type="text" value={val_price} style={{width:"50%"}} maxLength={10}/>
                    <Tooltip title="Click Here To Save Price">
                      <Button style={{marginLeft:"5px"}} type="primary" onClick={updateprice} shape={"round"} icon={<SaveFilled />}> Save</Button>
                    </Tooltip>

                    {
                      sel_Bom_Price !== val_price ? (<p style={{color:"red",fontSize:"10px"}}>Please Save Your Price Changes</p>) : (<></>)
                    }

                    <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* COMMENT</p>
                    <Input.TextArea onChange={onChangeComment} type="text" value={val_comment} style={{width:"80%"}} rows={3} maxLength={900}/>
                    <Tooltip title="Click Here To Save Comment">
                      <Button style={{marginLeft:"5px"}} type="primary" onClick={updatecomment} shape={"round"} icon={<SaveFilled />}> Save</Button>
                    </Tooltip>

                    {
                      sel_Bom_Comments !== val_comment ? (<p style={{color:"red",fontSize:"10px"}}>Please Save Your Comment</p>) : (<></>)
                    }

                    <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* ORDERING DATE</p>
                    <DatePicker value={moment(val_order1, dateFormat)} format={dateFormat} onChange={onChange_Update_Order1}/>
                    <Tooltip title="Click Here To Save Date">
                      <Button style={{marginLeft:"5px"}} type="primary" onClick={updateorder1} shape={"round"} icon={<SaveFilled />}> Save</Button>
                    </Tooltip>

                    {
                      sel_Bom_Order1 !== val_order1 ? (<p style={{color:"red",fontSize:"10px"}}>Please Save Ordering Date</p>) : (<></>)
                    }

                    <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* REVISED ORDERING DATE 1</p>
                    <DatePicker value={moment(val_order2, dateFormat)} format={dateFormat} onChange={onChange_Update_Order2}/>
                    <Tooltip title="Click Here To Save Date">
                      <Button style={{marginLeft:"5px"}} type="primary" onClick={updateorder2} shape={"round"} icon={<SaveFilled />}> Save</Button>
                    </Tooltip>

                    {
                      sel_Bom_Order2 !== val_order2 ? (<p style={{color:"red",fontSize:"10px"}}>Please Save Revised Ordering Date 1</p>) : (<></>)
                    }

                    <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* REVISED ORDERING DATE 2</p>
                    <DatePicker value={moment(val_order3, dateFormat)} format={dateFormat} onChange={onChange_Update_Order3}/>
                    <Tooltip title="Click Here To Save Date">
                      <Button style={{marginLeft:"5px"}} type="primary" onClick={updateorder3} shape={"round"} icon={<SaveFilled />}> Save</Button>
                    </Tooltip>

                    {
                      sel_Bom_Order3 !== val_order3 ? (<p style={{color:"red",fontSize:"10px"}}>Please Save Revised Ordering Date 2</p>) : (<></>)
                    }

                    <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* REVISED ORDERING DATE 3</p>
                    <DatePicker value={moment(val_order4, dateFormat)} format={dateFormat} onChange={onChange_Update_Order4}/>
                    <Tooltip title="Click Here To Save Date">
                      <Button style={{marginLeft:"5px"}} type="primary" onClick={updateorder4} shape={"round"} icon={<SaveFilled />}> Save</Button>
                    </Tooltip>

                    {
                      sel_Bom_Order4 !== val_order4 ? (<p style={{color:"red",fontSize:"10px"}}>Please Save Revised Ordering Date 3</p>) : (<></>)
                    }

                  </Col>

                </Row>
            </AntdDModal>

            <AntdDModal width={600} visible={isOpenSizeItem} title="Update Size Item" okButtonProps={{ disabled: true,hidden:true }} onCancel={()=>setisOpenSizeItem(false)}>
              <Row>
                <Col span={11}>
                  <p style={{fontSize:"12px"}}><b>GRAPHIC : </b>{val_Size_Graphic}</p>
                  <p style={{fontSize:"12px"}}><b>WASH DYE : </b>{val_Size_Wash}</p>
                  <p style={{fontSize:"12px"}}><b>COLOR : </b>{val_Size_Color}</p>
                  <p style={{fontSize:"12px"}}><b>GARMENT WAY : </b>{val_Size_Gmtway}</p>
                  <p style={{fontSize:"12px"}}><b>PRODUCTION PLANT: </b>{val_Size_ProPlant}</p>

                </Col>

                <Col span={1}>

                </Col>
              
                <Col span={12}>

                <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* GARMENT WAY</p>
                <Input onChange={onChangeGw} type="text" value={sel_Size_Gmtway} style={{width:"100%"}} maxLength={200}/>

                <p style={{color:"purple",fontSize:"11px",fontWeight:"bold"}}>* PRODUCTION PLANT</p>
                <Select style={{ width: '100%' }} value={sel_Size_Plant} onChange={handleChangeFactory} >
                {ds_factory.map((row) => (
                    <Select.Option value={row.fac_name}>{row.fac_name}</Select.Option>
                ))}
                </Select>

                <br/><br/>
                <Button type="primary" shape="round" size={"large"} onClick={handleClickSaveSize}> Save </Button>

                </Col>
            </Row>
            </AntdDModal>

          </Row>

        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default CreateNew;

