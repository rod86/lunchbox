import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import AdminLayout from '../Layout/AdminLayout';

const AdminErrorMessage = ({ children }) => (
    <AdminLayout>
        <Alert color="warning">
            {children}
        </Alert>
    </AdminLayout>
);

export default AdminErrorMessage;