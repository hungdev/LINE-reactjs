import React from 'react';
import Box from 'ui-box';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import {
  Pane, Heading, Text, IconButton, Button,
} from 'evergreen-ui';
import truckService from '../../../services/trucks';
import Auth from '../../../containers/Auth';
import Dashboard from '../../../containers/Dashboard';
import TruckEditor from '../../../components/TruckEditor';
import './TruckCreate.scss';

// TODO: Restore this
const initialValues = {
  plate: '35K-17461',
  driver: 'Ngo Xuan Bach',
  type: '10 tons',
  cargoTypes: ['Fish'],
  price: 10000000000,
  dimension: [10, 2.2, 2.3],
  parkingAddress: 'NOPE',
  status: 'New',
  productionYear: 2014,
  description: 'description',
};

class TruckList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Auth
        guest={() => <Redirect to="/" />}
        auth={() => (
          <Dashboard>
            <Helmet>
              <title>Create new truck</title>
            </Helmet>
            <Pane className="truck-create" background="tint1" elevation={1} border marginTop={32}>
              <Box display="flex" flexDirection="row">
                <Box flex="1">
                  <Heading size={600}>New Truck</Heading>
                  <Text color="muted" fontSize="10pt">Fill in the information of the truck to be create</Text>
                </Box>
                <Box alignSelf="center">
                  <IconButton icon="arrow-left" height={32} onClick={() => this.props.history.push('/trucks')} />
                </Box>
              </Box>
              <Box height={24} />
              <TruckEditor initialValues={initialValues} onSubmit={e => console.log(e)}>
                <Box display="flex" flexDirection="row">
                  <Box flex="1" />
                  <Box justifySelf="end">
                    <Button intent="success" appearance="primary" type="submit">Create</Button>
                  </Box>
                </Box>
              </TruckEditor>
            </Pane>
          </Dashboard>
        )}
      />
    );
  }
}

export default TruckList;
