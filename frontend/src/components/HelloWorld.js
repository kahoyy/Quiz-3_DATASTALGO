import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchHelloWorld, logout } from '../redux/actions';

function HelloWorld() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchHelloWorld());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <div className="mb-4">
          <Button variant="danger" onClick={handleLogout} className="mb-3">
            Logout
          </Button>
        </div>

        {loading ? (
          <div>
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">Error: {JSON.stringify(error)}</Alert>
        ) : data ? (
          <div>
            <h1 className="display-4">{data.message}</h1>
            <p className="lead">Successfully retrieved from protected endpoint</p>
          </div>
        ) : (
          <p>No data</p>
        )}
      </div>
    </Container>
  );
}

export default HelloWorld;
