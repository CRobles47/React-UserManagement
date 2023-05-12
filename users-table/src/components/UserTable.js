import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddUser from "./AddUser";

function UserTable(args) {

    const [users, setUsers] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [selectedUser, setUser] = React.useState({});
    const [rerender, setRerender] = React.useState(true);
    const toggle = () => setModal(!modal);

    React.useEffect(() => {
        if(rerender){
            fetch("http://localhost:8080/api/user/getall")
            .then(res => res.json())
            .then(
                (data) => {
                    setUsers(data);
                    setFilteredList(data);
                    setRerender(false);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [rerender]);

    const userList = filteredList.map((user, index) => {
        return <tr key={index}>
            {
                user.image !==  null &&  
                <td id="imgCol">
                    <img src={user.image} alt='user-profifile'></img>
                </td>
            }
            {
                user.image == null &&
                <td></td>
            }
            <td className="">
                <p>{user.id}</p>
            </td>
            <td>
                <p>{user.firstname}</p>
            </td>
            <td>
                <p>{user.lastname}</p>
            </td>
            <td className="w-25">
                <p>{user.email}</p>
            </td>
            <td className="w-25">
                <Button color="success" onClick={() => openEditForm(user)} className='btn-md btn-rounded m-1'>Edit</Button>
                <button onClick={() => deleteUser(user)} type="button" className="btn btn-danger btn-md btn-rounded m-1">Delete</button>
            </td>
        </tr>
    });

    const deleteUser = async (userToDelete) => {
        await fetch("http://localhost:8080/api/user/" + userToDelete.id,
            {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(
                (data) => {
                    console.log(data);
                    setFilteredList(filteredList.filter(user => user.id !== userToDelete.id));
                    setUsers(filteredList);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const openEditForm = async (userToEdit) => {
        await fetch(`http://localhost:8080/api/user/${userToEdit.id}`)
            .then(
                (data) => {
                    console.log(data);
                    setUser(userToEdit);
                },
                (error) => {
                    console.log(error);
                }
            )

        toggle();
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((
            {
                ...selectedUser,
                [name]: value
           
        }))
    }

    const handleUpdateUser = async () => {
        console.log(`USER SENT TO DB ${JSON.stringify(selectedUser)}`)
        await fetch(`http://localhost:8080/api/user/${selectedUser.id}`,
            {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, body: JSON.stringify(selectedUser)
            },)
            .then(
                (data) => {
                    console.log(data);
                    setRerender(true);
                },
                (error) => {
                    console.log(error);
                }
            )
        
            toggle();
    }

    const handleUserAdded = (shouldRender) => {
        setRerender(shouldRender);
    };

    const handleSearch = async (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if(searchTerm === ''){
            setFilteredList(users);
        } else {
            setFilteredList(users.filter(user => 
                user.firstname.toLowerCase().includes(searchTerm) || user.lastname.toLowerCase().includes(searchTerm) ));
        }
       
    }

    return (
        <>
        <div className="d-flex m-2">
            <input onChange={handleSearch} className="form-control form-control form-control-borderless" type="search" placeholder="Search users"/>
            <AddUser onUserAdd={handleUserAdded}></AddUser>
        </div>
        <br></br>
        <div>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th style={{width: '200px'}}></th>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList}
                </tbody>
            </table>

            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Edit User</ModalHeader>
                <form>
                    <ModalBody>
                        <div className="form-floating mb-3">
                            <input type="text" name="firstname" className="form-control" id="floatingInput" defaultValue={selectedUser.firstname || ''} onChange={handleInputChange} placeholder="First Name"/>
                            <label htmlFor="floatingInput">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" name="lastname" className="form-control" id="floatingInput" defaultValue={selectedUser.lastname || ''} onChange={handleInputChange} placeholder="Last Name" />
                            <label htmlFor="floatingInput">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" name="email" className="form-control" id="floatingInput" defaultValue={selectedUser.email || ''} onChange={handleInputChange} placeholder="Email Address" />
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
                        <Button color="primary" onClick={handleUpdateUser}>
                            Edit
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
        </>
    );
}

export default UserTable;