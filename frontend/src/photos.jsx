import { useEffect, useState } from "react";
import axios from 'axios';

function Photos() {
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image); // Use 'images' instead of 'Images'
        });
        formData.append('description', text); // Use 'description' instead of 'Text'

        axios.post('http://localhost:8081/upload', formData)
            .then(response => {
                console.log(response.data);
                // Handle success, maybe redirect to the feed
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleImageChange} />
            <textarea
                placeholder="Enter description"
                value={text}
                onChange={handleTextChange}
            />
            <button type="submit">Upload</button>
        </form>
    );
}

export default Photos;