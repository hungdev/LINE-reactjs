import React from 'react';
import Box from 'ui-box';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Pane, Heading, Text, Table, Spinner, Popover, IconButton, Menu, Select, toaster } from 'evergreen-ui';
import truckService from '../../../services/trucks';
import Auth from '../../../containers/Auth';
import Dashboard from '../../../containers/Dashboard';
import './TruckList.scss';

class TruckList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      page: 1,
      maxPage: 0,
      count: 0,
    };
  }

  componentDidMount() {
    this.doFetch(1);
  }
  
  pageSelected(page) {
    this.doFetch(page);
  }

  async doFetch(page) {
    try {
      this.setState({
        items: null,
        page: 1,
        maxPage: 0,
        count: 0,
      });
      const result = await truckService.search('', page);
      this.setState({
        items: result.items,
        page: result.page,
        maxPage: result.maxPage,
        count: result.count,
      });
    } catch (error) {
      toaster.error(`Unable to get trucks list: ${error.message}`);
      console.error(error);
    }
  }

  renderTable() {
    const { items } = this.state;

    return (
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Truck Plate</Table.TextHeaderCell>
          <Table.TextHeaderCell flex="1.5">Cargo Types</Table.TextHeaderCell>
          <Table.TextHeaderCell>Truck type</Table.TextHeaderCell>
          <Table.TextHeaderCell>Dimension (L-W-H)</Table.TextHeaderCell>
          <Table.TextHeaderCell>Production year</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
          <Table.HeaderCell flex="0 0" flexBasis={64}>&nbsp;</Table.HeaderCell>
        </Table.Head>
        <Table.Body>
          {items.map(({ id, plate, cargoTypes, type, dimension, productionYear, status}) => (
            <Table.Row key={id}>
              <Table.TextCell textProps={{ fontWeight: 600 }}>{plate}</Table.TextCell>
              <Table.TextCell flex="1.5">{cargoTypes.join(', ')}</Table.TextCell>
              <Table.TextCell>{type}</Table.TextCell>
              <Table.TextCell>{dimension.join('-')}</Table.TextCell>
              <Table.TextCell>{productionYear}</Table.TextCell>
              <Table.TextCell>{status}</Table.TextCell>
              <Table.Cell flex="0 0" flexBasis={64}>
                <Popover content={(
                  <Menu>
                    <Menu.Group>
                      <Menu.Item>View</Menu.Item>
                      <Menu.Item>Edit</Menu.Item>
                      <Menu.Item intent="danger">Delete</Menu.Item>
                    </Menu.Group>
                  </Menu>
                )}>
                  <IconButton appearance="minimal" icon="more"/>
                </Popover>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  renderPaginator() {
    const { page, maxPage, count } = this.state;

    return (
      <Box marginTop={24} display="flex" flexDirection="row">
        <Box flex="1">
          <Text color="muted">
            Displaying page {page} out of {maxPage} pages ({count} items)
          </Text>
        </Box>
        <Box flex="0" display="flex" flexDirection="row">
          <IconButton icon="chevron-left" height={24} disabled={page < 2} onClick={() => this.doFetch(page - 1)} />
          <Select value={page} height={24} width={64} onChange={ev => this.doFetch(ev.target.value)}>
            {Array(maxPage).fill().map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </Select>
          <IconButton icon="chevron-right" height={24} disabled={page >= maxPage} onClick={() => this.doFetch(page + 1)} />
        </Box>
      </Box>
    );
  }

  render() {
    return (
      <Auth guest={() => <Redirect to="/"/>} auth={user => (
        <Dashboard>
          <Helmet>
            <title>Truck management</title>
          </Helmet>
          <Pane className="truck-list" background="tint1" elevation={1} border marginTop={32}>
            <Heading size={600}>Trucks List</Heading>
            <Text color="muted" fontSize="10pt">Below is the list of trucks from system</Text>
            <Box height={24} />
            {(this.state.items && (
              <React.Fragment>
                {this.renderTable()}
                {this.renderPaginator()}
              </React.Fragment>
            )) || (
              <Box width="100%" paddingY="64px" textAlign="center">
                <Spinner marginX="auto" />
              </Box>
            )}
          </Pane>
        </Dashboard>
      )}/>
    );
  }
}

export default TruckList;
