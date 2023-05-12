import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function AddUser({args, onUserAdd}) {
    const [modal, setModal] = useState(false);
    const [newUser, setUser] = React.useState({});
    const [selectedImage, setSelectedImage] = React.useState(null);
    

    const toggle = () => setModal(!modal);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser(({
            ...newUser,
            [name]: value
        }));
    }

    const handleAddUser = async () => {

            console.log(`USER SENT TO DB ${JSON.stringify(newUser)}`)
            await fetch(`http://localhost:8080/api/user/create`,
                {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }, body: JSON.stringify(newUser)
                },)
                .then(
                    (data) => {
                        console.log(data);
                        // setRerender(true);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            
            onUserAdd(true);
            toggle();
    }

    return (
        <div className="w-75" style={{textAlign: 'right'}}>
        <Button color="primary" onClick={toggle} className='m-1 p-2'>
            Add User
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Add User</ModalHeader>
            <form>
                <ModalBody>
                    <div className="form-floating mb-3">
                        <input type="text" name="firstname" className="form-control" id="floatingInput" onChange={handleInputChange} placeholder='First Name'/>
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" name="lastname" className="form-control" id="floatingInput" onChange={handleInputChange} placeholder="Last Name" />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" name="email" className="form-control" id="floatingInput" onChange={handleInputChange} placeholder="Email Address"/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div>
                        <label className="form-label p-1" htmlFor="floatingInput">Picture URL</label>
                        <input type="text" name="image" className="form-control" id="floatingInput" onChange={handleInputChange}/>
                    </div>
                    {/* <div>
                        <label className="form-label p-1" htmlFor="floatingInput">Upload Picture</label>
                        <input type="file" name="image" className="form-control" id="floatingInput" onChange={handleInputChange} accept="image/png, image/gif, image/jpeg"/>
                    </div> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddUser}>
                        Add
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
        </div>
    );
}

export default AddUser;