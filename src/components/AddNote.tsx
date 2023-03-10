import MDEditor from "@uiw/react-md-editor";
import { FloatButton, message } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { createNoteObject } from "../utils/helper";
import 'katex/dist/katex.css';
import rehypeSanitize from "rehype-sanitize";

interface Props {
    editMode?: boolean
}

const AddNotes: React.FC<Props> = ({ editMode = true }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = React.useState<string>("**Hello world!!!**");
    const navigate = useNavigate();

    const handleSave = () => {
        saveQuickNote()
    }

    const saveQuickNote = () => {
        if (value.trim().length === 0) {
            return;
        }
        addDoc(collection(firestore, 'notes'), createNoteObject(value, "MARKDOWN"))
            .then(res => {
                messageApi.success("Added!");
                navigate("notes");
            }).catch(err => {
                messageApi.success(`[Error] ${err}`);
            })
    };

    return (<>
        {contextHolder}
        <div className="container md-container">
            <MDEditor
                value={value}
                height={920}
                onChange={(val = "") => setValue(val)}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
            <FloatButton
                shape="square"
                type="primary"
                style={{ right: 40 }}
                icon={<SaveOutlined />}
                onClick={handleSave}
                tooltip={<div>Save Note</div>}
            />
        </div>
    </>);
}

export default AddNotes;