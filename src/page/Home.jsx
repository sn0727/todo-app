import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function ContainerExample({ saveFun }) {
  const [inputFeild, setInputFeild] = useState({
    id: Math.random().toFixed(2),
    itemName: "",
    amount: "",
    installment: "",
    date: ""
  })


  const inputHandler = (event) => {
    setInputFeild({ ...inputFeild, [event.target.name]: event.target.value })
  }

  // save data in the localstorage.
  const saveData = () => {
    let exitingItems = localStorage.getItem('items')
    if (exitingItems) {
      exitingItems = JSON.parse(exitingItems)
    } else {
      exitingItems = []
    }
    exitingItems.push(inputFeild);
    localStorage.setItem('items', JSON.stringify(exitingItems))
    window.location.reload(false);
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control type="email"
            name='itemName'
            onChange={inputHandler}
            placeholder="Enter Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Amount</Form.Label>
          <Form.Control type="text"
            name='amount'
            onChange={inputHandler}
            placeholder="Enter Amount"
            required="required"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Installment</Form.Label>
          <Form.Control type="text"
            name='installment'
            onChange={inputHandler}
            placeholder="Enter Installment no"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Select date here</Form.Label>
          <Form.Control type="date"
            name='date'
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Button variant="success" onClick={() => saveData()}>Add</Button>
      </Form>
    </>
  );
}

// table list data,
function TableList({ sendFun }) {
  // const [data, setData] = useState([])

  // function fetchFun() {
  //   setData(JSON.parse(localStorage.getItem('items')));
  // }

  // const deleteFun = (id) => {
  //   let getData = JSON.parse(localStorage.getItem('items'));
  //   let updateNewData = getData?.filter((item) => item?.id !== id);
  //   console.log(updateNewData, "============= id");
  //   setData(updateNewData);
  //   // Assuming fetchFun is a function that handles other operations
  //   fetchFun();
  // };

  // useEffect(() => {
  //   // fetchFun()
  //   const storedData = JSON.parse(localStorage.getItem('items')) || [];
  //   setData(storedData);
  // }, [])

  const [data, setData] = useState([]);

  const fetchFun = () => {
    const storedData = JSON.parse(localStorage.getItem('items')) || [];
    setData(storedData);
  };

  const deleteFun = (id) => {
    let getData = JSON.parse(localStorage.getItem('items'));
    let updateNewData = getData?.filter((item) => item?.id !== id);
    // console.log(updateNewData, "============= id");
    localStorage.setItem('items', JSON.stringify(updateNewData));
    // Update the state using fetchFun
    fetchFun();
  };

  useEffect(() => {
    // Initial data fetch on component mount
    fetchFun();
  }, []);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>Sender Name</th>
          <th>Installment</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data?.map((items, index) => (
            <tr key={index}>
              <td>{items?.id}</td>
              <td>{items?.itemName}</td>
              <td>{items?.installment}</td>
              <td>&#8377;{items?.amount}</td>
              <td>{items?.date}</td>
              <td>
                <Button variant="danger"
                  style={{ width: '100%' }}
                  onClick={() => deleteFun(items?.id)}
                >Delete</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

const Home = () => {

  return (
    <div className='todo-app-list'>
      <div className='container'>
        <div className='row'>
          <div className="col-6">
            <div className='row-cs'>
              <h1 className='text-center'>Todo App</h1>
              <ContainerExample />
            </div>
          </div>
          <div className="col-6">
            <div className='row-cs changes'>
              <h1 className='text-center mb-3'>Installment Table</h1>
              <TableList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;