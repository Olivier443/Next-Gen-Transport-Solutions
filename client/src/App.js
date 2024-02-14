import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import Banner from './Nav/Banner';
import Footer from './components/footer/Footer';
import SupportSide from './pages/SupportSide';
import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/Homepage';
import Carrier from './pages/Carrier';
import Signin from './components/users/Signin';
import ProfileNew from './components/profile/ProfileNew';
import ProfileView from './components/profile/ProfileView';
import ProfileEdit from './components/profile/ProfileEdit';
import ProfileDelete from './components/profile/ProfileDelete';
import CurrenyRates from './components/currency/CurrencyRates';
import CurrencyConverter from './components/currency/CurrencyConverter';
import TruckRoute from './components/route/TruckRoute';
import TruckRouteNew from './components/route/TruckRouteNew';
import TruckRouteView from './components/route/TruckRouteView';
import TruckRouteEdit from './components/route/TruckRouteEdit';
import TruckRouteDelete from './components/route/TruckRouteDelete';
import ClientSide from './pages/ClientSide';
import Client from './pages/Client';
import BulkRequestClient from './components/clients/contactClient/BulkRequestClient';
import ClientViewAllRoutes from './components/clients/viewClient/ClientViewAllRoutes';
import ClientBulkRequestsView from './components/clients/contactClient/ClientBulkRequestsView';
import Mails from './components/mail/Mails';
import CreateTrackingDoc from './components/Tracking/TrackingCarrier/CreateTrackingDoc';
import ViewUpdateTrackingDoc from './components/Tracking/TrackingCarrier/ViewUpdateTrackingDoc';
import TruckOneRouteView from './components/route/TruckOneRouteView';
import TrackingRoutes from './components/Tracking/TrackingClient/TrackingRoutes';
import Request from './components/request/Request';

function App() {

  const [myRoute, setMyRouteId] = useState();

  return (
    <>
      <GlobalStyles />
      <Banner />
      <DIVFLEX>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/signup" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<Signin />} />

          <Route path="/profile/new" element={<ProfileNew />} /> {/* // Allows the user to create his profile */}
          <Route path="/profile/view" element={<ProfileView />} /> {/* // Allows the user to view his profile */}
          <Route path="/profile/edit" element={<ProfileEdit />} /> {/* // Allows the user to update his profile */}
          <Route path="/profile/delete" element={<ProfileDelete />} /> {/* // Allows the user to delete his profile */}
          <Route path="/profile/view/:userIdFromUseParams" element={<ProfileView />} /> {/* // Allows the user to view the profile of the carrier with its feedback */}

          <Route path="/exchangerates" element={<CurrenyRates />} /> {/* // Allows to see the USD to CAD and CAD to USD */}
          <Route path="/currencyconverter" element={<CurrencyConverter />} /> {/* // Allows to convert currencies. */}

          <Route path="/carrier" element={<Carrier />} />
          <Route path="/carrier/route" element={<TruckRoute />} />
          <Route path="/carrier/route/new" element={<TruckRouteNew />} /> {/* // Allows the carrier to create his route */}
          <Route path="/carrier/route/view" element={<TruckRouteView myRoute={myRoute} setMyRouteId={setMyRouteId} />} /> {/* // Allows the carrier to view, modify, delete, and create tracking documents for the routes he created */}
          <Route path="/carrier/route/edit/:myRoute" element={<TruckRouteEdit />} /> {/* // Allows the carrier to modify one of his specific route. */}
          <Route path="/carrier/route/delete" element={<TruckRouteDelete />} /> {/* // Allows the carrier to delete his route */}
          <Route path="/route:routeId" element={<TruckOneRouteView />} /> {/* Display a truck route depending on routeId */}
          <Route path="/request/:requestId" element={<Request />} />

          <Route path="/mailbox/:currentCarrierId" element={<Mails />} /> {/* // Allows the user to access his own mailbox */}
          <Route path="/mailbox" element={<Mails />} />

          <Route path="/client" element={<Client />} /> {/* This is the page for the client with the different menus (Profile, Request, Mailbox, FindRoutes) */}
          <Route path="/clientside" element={<ClientSide />} />
          <Route path="/client/request/view" element={<ClientBulkRequestsView />} /> {/* This is the page for the client to view the request that he created. He also has the possibility to choose the carriers he wants to send his request */}
          <Route path="/client/viewRoutes" element={<ClientViewAllRoutes />} /> {/* // Allows the user to see all the routes advertised by the carriers and to enter in communication with a carrier. He also has access to the profile of the carrier. */}
          <Route path="/client/request/new" element={<BulkRequestClient />} /> {/* This is the page for the client to create a new request that will be sent to multiple carriers */}

          {/* Tracking Carrier */}
          <Route path="/carrier/tracking/trackingdoc/:routeid" element={<CreateTrackingDoc />} /> {/* Allows to create the tracking document. */}
          <Route path="/carrier/tracking/viewupdtrackingdoc" element={<ViewUpdateTrackingDoc />} /> {/* Allows to display the tracking documents created by a specific carrier. The carrier will have the possibility to update or delete this tracking document. */}

          {/* Tracking Client */}
          <Route path="/client/tracking/routes" element={<TrackingRoutes />} />

          <Route path="/SupportSide" element={<SupportSide />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </DIVFLEX>
    </>
  )
}

export default App;

const DIVFLEX = styled.div`
display: flex;
flex-direction: column;
`