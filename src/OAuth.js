import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './Header/AppNavbar';
import { Link } from 'react-router-dom';

class OAuth extends Component {

    constructor(props) {
        super(props);
        this.state = { clients: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({ clients: data }));
    }

    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({ clients: updatedClients });
        });
    }

    render() {
        const { clients } = this.state;

        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{client.id}</td>
                <td>{client.name}</td>

            </tr>
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Button color="success" tag={Link} to="/">Home  </Button>{'  '}
                    <Button color="success" tag={Link} to="/addclient">Add</Button>
                </Container>

                <Container fluid>
                    <h4>OAuth 2.0 Clients</h4>



                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">ClientID</th>
                                <th width="30%">Client Name</th>

                            </tr>
                        </thead>
                        <tbody>
                            {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default OAuth;