import React from 'react';
import Box from 'ui-box';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import {
  Pane, Heading, Text, IconButton, Spinner, toaster,
} from 'evergreen-ui';
import truckService from '../../../services/trucks';
import Auth from '../../../containers/Auth';
import Dashboard from '../../../containers/Dashboard';
import TruckEditor from '../../../components/TruckEditor';
import './TruckEdit.scss';

class TruckEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      truck: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.doFetch(this.props.match.params.id);
  }

  async onSubmit(values, { setSubmitting }) {
    try {
      await truckService.update(this.state.truck.id, values);
      toaster.success('Truck updated successfully');
      this.props.history.push('/trucks');
    } catch (error) {
      toaster.danger(`Unable to update truck: ${error.message}`);
      console.error(error);
    }
    setSubmitting(false);
  }

  async doFetch(id) {
    try {
      const truck = await truckService.get(id);
      this.setState({ truck });
    } catch (error) {
      toaster.danger(`Unable to get truck information: ${error.message}`);
      console.error({ error });
    }
  }

  render() {
    const loaded = !!this.state.truck;
    return (
      <Auth
        guest={() => <Redirect to="/" />}
        auth={() => (
          <Dashboard>
            <Helmet>
              <title>Edit truck</title>
            </Helmet>
            <Pane className="truck-create" background="tint1" elevation={1} border marginTop={32}>
              <Box display="flex" flexDirection="row">
                <Box flex="1">
                  <Heading size={600}>Edit Truck</Heading>
                  <Text color="muted" fontSize="10pt">Here you can apply changes to selected truck</Text>
                </Box>
                <Box alignSelf="center">
                  <IconButton icon="arrow-left" height={32} onClick={() => this.props.history.push('/trucks')} />
                </Box>
              </Box>
              <Box height={24} />
              {loaded ? (
                <TruckEditor initialValues={this.state.truck} submitTitle="Edit" onSubmit={this.onSubmit} />
              ) : (
                <Box width="100%" paddingY="64px" textAlign="center">
                  <Spinner marginX="auto" />
                </Box>
              )}
            </Pane>
          </Dashboard>
        )}
      />
    );
  }
}

export default TruckEdit;
