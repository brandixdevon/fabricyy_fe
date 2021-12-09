import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, notification, Row, Col, Tooltip, Tag, Table, Input, Space, Button  } from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import Moment from 'react-moment';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_api');
    var username = localStorage.getItem('session_username');

    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');

    const [ds_alllist , setds_alllist] = React.useState([]);

    function getColumnSearchProps(dataIndex) {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              // ref={node => {
              //   this.searchInput = node;
              // }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            // setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      }
    };
  
    function handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    function handleReset(clearFilters) {
      clearFilters();
      setSearchText('');
    };

    const tablecolumns = [
      {
        title: 'Action',
        dataIndex: 'fabyy_id',
        width: '5%',
        key: 'id',
        render: (val) => ActionButtonStrip(val),
      },
      {
        title: 'Customer',
        dataIndex: 'cus_name',
        width: '15%',
        key: 'cus_name',
        ...getColumnSearchProps('cus_name'),
        sorter: (a, b) => a.cus_name.localeCompare(b.cus_name),
      },
      {
        title: 'Factory',
        dataIndex: 'fac_name',
        width: '15%',
        key: 'fac_name',
        ...getColumnSearchProps('fac_name'),
        sorter: (a, b) => a.fac_name.localeCompare(b.fac_name),
      },
      {
        title: 'Style NO',
        dataIndex: 'cus_sty_no',
        width: '15%',
        key: 'cus_sty_no',
        ...getColumnSearchProps('cus_sty_no'),
        sorter: (a, b) => a.cus_sty_no.localeCompare(b.cus_sty_no),
      },
      {
        title: 'M3 Style NO',
        dataIndex: 'm3_sty_no',
        width: '15%',
        key: 'm3_sty_no',
        ...getColumnSearchProps('m3_sty_no'),
        sorter: (a, b) => a.m3_sty_no.localeCompare(b.m3_sty_no),
      },
      {
        title: 'Old Style NO',
        dataIndex: 'old_sty_no',
        width: '15%',
        key: 'old_sty_no',
        ...getColumnSearchProps('old_sty_no'),
        sorter: (a, b) => a.old_sty_no.localeCompare(b.old_sty_no),
      },
      {
        title: 'Create Date',
        dataIndex: 'create_ts',
        width: '10%',
        key: 'create_ts',
        sorter: (a, b) => moment(a.create_ts) - moment(b.create_ts),
        render: (val) => ConvertToDatetime(val),
      },
      {
        title: 'Status',
        dataIndex: 'fabyy_status',
        width: '10%',
        key: 'fabyy_status',
        sorter: (a, b) => a.fabyy_status - b.fabyy_status,
        render: (val) => YesNo(val),
      },
    ];

    function YesNo(value)
    {
      if(value === "Edit")
      {
        return <Tag color={'orange'} key={'Active'}>Edit</Tag>;
      }
      else if(value === "Complete")
      {
        return <Tag color={'green'} key={'Disable'}>Complete</Tag>;
      }
    }

    function ConvertToDatetime(value)
      {
        if(value !== null)
        {
          return <Moment format="YYYY-MMM-DD h:mm:ss a">{value}</Moment>;
        }
        else
        {
          return null;
        }
        
      }

      function ActionButtonStrip(value)
      {
        return (<Tooltip title="Edit">
        <Link to={"/edityy/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }

    React.useEffect(() => {

      const sendOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username" : username , 
            "typeid" : 'ALL'
        })
      };
    
      fetch(`${apiurl}/fabricyy/listofyy`,sendOptions)
      .then(res => res.json())
      .then(response => { 

          if(response.Type === "SUCCESS")
          {
              setds_alllist(response.Data);

          }
          else
          {
              notification['error']({
                  message: 'Data Error',
                  description: 'Data Loading Error.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }

           
      })
      .catch(error => {

          notification['error']({
              message: 'Data Error',
              description: error,
              style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
            });

      });


    }, [apiurl,username]);
    
    return( <Layout style={{ minHeight: '100vh' }}>
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>FAB YY</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard (List Of YY)</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
            
            <Table dataSource={ds_alllist} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>

            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

