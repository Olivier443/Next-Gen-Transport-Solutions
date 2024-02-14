import React from 'react'
import ProfileMenu from '../components/profile/ProfileMenu';
import ClientViewAllRoutes from '../components/clients/viewClient/ClientViewAllRoutes';
import BulkRequestClient from '../components/clients/contactClient/BulkRequestClient';
import ClientMailShell from '../components/clients/contactClient/ClientMailShell';

const ClientSide = () => {
  return (
    <div>
      <ClientMailShell />
      <ProfileMenu />
      <BulkRequestClient />
      <ClientViewAllRoutes />
    </div>
  )
}

export default ClientSide
