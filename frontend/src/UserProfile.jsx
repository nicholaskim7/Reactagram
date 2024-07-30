import react, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Profile() {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [relationship, setRelationship] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/user/${id}`)
        .then(res => {
            setUser(res.data.user || {});
            setBio(res.data.user.bio || '');
            setProfilePic(res.data.user.profile_picture || '');
            setRelationship(res.data.user.relationship || '');
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('full_name', user.full_name);
        formData.append('username', user.username);
        formData.append('relationship', relationship);
        if(profilePic) {
            formData.append('profile_picture', profilePic);
        }

        axios.put(`http://localhost:8081/user/${id}/update`, formData)
        .then(res => {
            console.log(res);
            navigate(`/loggedin/${id}`);
        })
        .catch(err => console.log(err));
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Update Profile</h2>
                <form onSubmit={handleProfileUpdate}>
                <div className='mb-2'>
                    <label>Name</label>
                    <input type="text" name="full_name" className='form-control'
                            value={user.full_name || ''}
                            onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Username</label>
                    <input type="text" name="username" className='form-control'
                            value={user.username || ''}
                            onChange={handleChange}
                    />
                </div>
                <div className='mb-2'>
                    <label>Update Bio</label>
                    <textarea
                    className='form-control'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder='Enter your bio'
                    ></textarea>
                </div>
                <div className='mb-2'>
                    <label>Update Profile Picture</label>
                    <input type='file' className='form-control' onChange={handleFileChange} />
                    {user.profile_picture && <img src={`http://localhost:8081${user.profile_picture}`} alt="Profile" width="100" />}
                </div>
                <div className='mb-2'>
                    <label>Update Relationship Status:</label>
                    <select
                        className='form-control'
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                    >
                        <option value=''>Select status</option>
                        <option value='Single'>Single</option>
                        <option value='In a Relationship'>In a Relationship</option>
                        <option value='Married'>Married</option>
                        <option value='Complicated'>Complicated</option>
                    </select>
                </div>
                <button className='btn btn-success'>Update Profile</button>
                </form>
            </div>
        </div>
    );
}
export default Profile;