import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout} from 'antd';
import 'antd/dist/antd.css';

function FooterView() 
{
    const { Footer } = Layout;

    var loguser = localStorage.getItem('session_username');

    return(<Footer style={{ textAlign: 'center' }}>©<>{new Date().getFullYear()}</> Solution by BFF EAG Team - Current User ({loguser})</Footer>);
}

export default FooterView;

