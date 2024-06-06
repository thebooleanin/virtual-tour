import React from 'react';
import { useDispatch } from 'react-redux';
import { setImage } from '../../redux/actions/imageActions';
import './FileUploader.css';

const FileUploader = () => {
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            dispatch(setImage(url));
        }
    };

    return (
        <div className="file-uploader">
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;
