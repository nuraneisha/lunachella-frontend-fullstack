import { Row, Card, Col, Button, Spinner } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ModalContext } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/cards.css";

export default function Cards() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const { setShowLoginModal } = useContext(ModalContext);
    const navigate = useNavigate();

    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 10;
        const delay = 10000; // 10 seconds

        const fetchData = () => {
            fetch("https://lunachella-scrapper-fullstack.onrender.com/kuala-lumpur")
                .then((response) => {
                    if (!response.ok) throw new Error("Server sleeping");
                    return response.json();
                })
                .then((json) => {
                    if (Array.isArray(json)) {
                        setData(json);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log("Backend not awake yet. Retrying...", retryCount + 1);
                    retryCount++;
                    if (retryCount < maxRetries) {
                        setTimeout(fetchData, delay);
                    } else {
                        setLoading(false); // stop trying after maxRetries
                    }
                });
        };

        fetchData();
    }, []);

    const handleViewTickets = (item) => {
        if (currentUser) {
            navigate(`/tickets/${encodeURIComponent(item.name)}`);
        } else {
            setShowLoginModal(true);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span className="ms-3 text-muted">Waking up the server...</span>
            </div>
        );
    }

    return (
        <Row className="mt-4">
            {data.map((item, index) => (
                <Col key={index} md={4} className="mb-4">
                    <Card>
                        {item.image && (
                            <Card.Img variant="top" src={item.image} alt={item.name} />
                        )}
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>📍 {item.location}</Card.Text>
                            <Card.Text>📅 {item.date}</Card.Text>
                            <Button variant="primary" onClick={() => handleViewTickets(item)}>
                                View Tickets
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
