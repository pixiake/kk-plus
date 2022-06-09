import {Button, Card, Form, Radio, Tooltip, Switch, Col, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    lastStep,
    nextStep,
    selectConfiguration,
    selectStep, updateCluster, updateControlPlane, updateNetwork,
} from "../../features/configurations/configurationsSlice";
import MaskedInput from 'react-maskedinput'
import React, { useState } from 'react';

import DynamicField from "../DynamicField";

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};



const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
};


const Storage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [storageType, setStorageType] = useState('local');

    const configuration = useSelector(selectConfiguration);
    const step = useSelector(selectStep);


    const getNetworkConfig = (network) => {
        let config = {
            plugin: network.plugin,
            podsCIDR: network.kubePodsCIDR,
            serviceCIDR: network.kubeServiceCIDR,
        }
        console.log(config)
        return config
    }

    // const [initValue] = useState(getNetworkConfig(configuration.network))
    //

    const saveNetworkConfig = () => {
        const network = form.getFieldsValue(true)

        let config = {
            plugin: network.plugin,
            podsCIDR: network.kubePodsCIDR,
            serviceCIDR: network.kubeServiceCIDR,
        }

        dispatch(updateNetwork(
            {
                network: config
            }
        ))

    }
    const handleSubmmit = () => {
        saveNetworkConfig()
        dispatch(nextStep())
    }

    const handleLastStep = () => {
        saveNetworkConfig()
        dispatch(lastStep())
    }

    const onChange = () => {
        const storage = form.getFieldsValue(true)
        console.log(storage)
        switch (storage.storageType) {
            case 'nfs':
                setStorageType('nfs')
                break
            case 'ceph':
                setStorageType('ceph')
                break
            default:
                setStorageType('local')
        }
    }

    const storageConfig = (storageType) => {
        console.log(storageType)
        switch (storageType) {
            case 'nfs':
                return (
                    <>
                        <Form.Item label="NFS 服务地址" name="nfsServer">
                            <Input />
                        </Form.Item>
                        <Form.Item label="NFS 服务路径" name="nfsPath">
                            <Input />
                        </Form.Item>
                    </>
                )
            default:
                return (
                    <noscript/>
                )
        }
    }


    return step === 5 ? (
            <Card
                title="存储设置"
                style={{ marginTop: 16 }}
                type="inner"
            >
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 6,
                    }}
                    layout="horizontal"
                    // initialValues={ initValue }
                    form={form}
                    onFinish={ handleSubmmit }
                >
                    <Form.Item label="存储类型" name="storageType">
                        <Radio.Group onChange={onChange}>
                            <Tooltip title="将自动安装 openebs local provisioner 提供本地存储服务">
                               <Radio value="local">
                                   本地存储
                               </Radio>
                            </Tooltip>
                            <Tooltip title="将根据配置自动安装 nfs-client-provisioner 对接第三方 NFS 存储">
                               <Radio value="nfs">
                                   对接 NFS
                               </Radio>
                            </Tooltip>
                            <Tooltip title="将在集群中安装 rook-ceph，要求存储节点挂载裸盘">
                               <Radio value="ceph">
                                   Rook Ceph
                               </Radio>
                            </Tooltip>
                        </Radio.Group>
                    </Form.Item>
                    { storageConfig(storageType) }
                    <Form.Item {...tailLayout}>
                        <Button
                            htmlType="button"
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={ handleLastStep }
                        >
                            上一步
                        </Button>
                        <Button htmlType="submit" type="primary">
                            下一步
                        </Button>
                    </Form.Item>
                </Form>
        </Card>
    ) : (
        <noscript></noscript>
    )
}

export default Storage