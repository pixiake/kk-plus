import React from 'react';
import 'antd/dist/antd.min.css';
import './Configurations.css';
import { Layout} from 'antd';
import {useSelector} from "react-redux";
import {selectStep} from "./configurationsSlice";
import logo from "../../logo.svg";
import Stepper from "../../components/Stepper";
import Hosts from "../../components/Hosts";


const { Header, Content, Sider } = Layout;

export function Configurations() {
    const step = useSelector(selectStep);


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
        <Sider>
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <Stepper>{step}</Stepper>
        </Sider>
        <Layout className="site-layout">
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
            }}
        />
        <Content
            style={{
                padding: '0',
            }}
        >
            <Hosts/>

        </Content>
        </Layout>
    </Layout>
    );
};
