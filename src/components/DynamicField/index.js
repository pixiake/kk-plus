import {Button, Form, Input} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";


const DynamicField = (props) => {
    return (
        <Form.List name={props.name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Form.Item
                            key={key}
                            style={{
                                marginBottom: 0,
                            }}
                        >
                            <Form.Item
                                name={[name, 'key']}
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入 key 值"
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    width: '45%',
                                }}
                            >
                                <Input placeholder="key" />
                            </Form.Item>
                            <Form.Item
                                name={[name, 'value']}
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入 value 值"
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    width: '45%',
                                    marginRight: "8px",
                                }}
                            >
                                <Input placeholder="value" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Form.Item>
                    ))}
                    <Form.Item
                        wrapperCol={{ offset: 0 , span: 6 }}
                    >
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            {props.label}
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    )
}

export default DynamicField