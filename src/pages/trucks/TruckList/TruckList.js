import React from 'react';
import Box from 'ui-box';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import {
  Pane, Card, Heading, Text, Strong, Paragraph, UnorderedList,
  ListItem, Table, Spinner, Popover, Button, IconButton, Menu, Select, SideSheet, toaster,
} from 'evergreen-ui';
import truckService from '../../../services/trucks';
import Auth from '../../../containers/Auth';
import Dashboard from '../../../containers/Dashboard';
import './TruckList.scss';

const numberFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

class TruckList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      page: 1,
      maxPage: 0,
      count: 0,
      popup: null,
    };
  }

  componentDidMount() {
    this.doFetch(1);
  }

  pageSelected(page) {
    this.doFetch(Number(page));
  }

  popup(item) {
    this.setState({
      popup: item,
    });
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
      toaster.warning(`Unable to get trucks list: ${error.message}`);
      console.error(error);
    }
  }

  renderTable() {
    const { items } = this.state;

    return (
      <Table border>
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
          {items.map((item) => {
            const {
              id, plate, cargoTypes, type, dimension, productionYear, status,
            } = item;
            return (
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
                        <Menu.Item onSelect={() => this.popup(item)}>View</Menu.Item>
                        <Menu.Item>Edit</Menu.Item>
                        <Menu.Item intent="danger">Delete</Menu.Item>
                      </Menu.Group>
                    </Menu>
                  )}
                  >
                    <IconButton appearance="minimal" icon="more" />
                  </Popover>
                </Table.Cell>
              </Table.Row>
            );
          })}
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
          <IconButton icon="chevron-left" height={24} disabled={page < 2} onClick={() => this.pageSelected(page - 1)} />
          <Select value={page} height={24} width={64} onChange={ev => this.pageSelected(ev.target.value)}>
            {Array(maxPage).fill().map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
          <IconButton icon="chevron-right" height={24} disabled={page >= maxPage} onClick={() => this.pageSelected(page + 1)} />
        </Box>
      </Box>
    );
  }

  renderSideSheet() {
    const { popup } = this.state;
    return popup && (
      <SideSheet
        isShown={!!popup}
        onCloseComplete={() => this.popup(null)}
        containerProps={{ background: 'blueTint', display: 'flex', flexDirection: 'column' }}
      >
        <Pane paddingX={24} paddingY={16} elevation={0} borderBottom>
          <Heading size={400}>Truck information</Heading>
        </Pane>
        <Pane background="tint2" flex="1" padding={8}>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Truck Plate</Heading>
            <Paragraph fontWeight={400} fontFamily="mono">{popup.plate}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Driver</Heading>
            <Paragraph fontWeight={400}>{popup.driver}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Cargo Types</Heading>
            <UnorderedList size={300}>
              {popup.cargoTypes.map(type => (<ListItem key={type}>{type}</ListItem>))}
            </UnorderedList>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Truck Type</Heading>
            <Paragraph fontWeight={400}>{popup.type}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Dimension</Heading>
            <Paragraph fontWeight={400}>
              <Strong>{popup.dimension[0]}</Strong> x <Strong>{popup.dimension[1]}</Strong> x <Strong>{popup.dimension[2]}</Strong>
            </Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Price</Heading>
            <Paragraph fontWeight={400}>{numberFormat.format(popup.price)}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Production Year</Heading>
            <Paragraph fontWeight={400}>{popup.productionYear}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Parking Address</Heading>
            <Paragraph fontWeight={400}>{popup.parkingAddress}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Description</Heading>
            <Paragraph fontWeight={400} fontSize="10pt" lineHeight="12pt">{popup.description}</Paragraph>
          </Card>
          <Card background="tint1" elevation={0} border padding={8} marginBottom={8}>
            <Heading is="h3" size={100}>Status</Heading>
            <Paragraph fontWeight={400}><Strong>{popup.status}</Strong></Paragraph>
          </Card>
        </Pane>
      </SideSheet>
    );
  }

  render() {
    const loaded = !!this.state.items;
    return (
      <Auth
        guest={() => <Redirect to="/" />}
        auth={() => (
          <Dashboard>
            <Helmet>
              <title>Truck management</title>
            </Helmet>
            <Pane className="truck-list" background="tint1" elevation={1} border marginTop={32}>
              <Box display="flex" flexDirection="row">
                <Box flex="1">
                  <Heading size={600}>Trucks List</Heading>
                  <Text color="muted" fontSize="10pt">Below is the list of trucks from system</Text>
                </Box>
                <Box alignSelf="center">
                  <Button appearance="primary" intent="success" height={32} onClick={() => this.props.history.push('/trucks/new')}>New</Button>
                </Box>
              </Box>
              <Box height={24} />
              {(loaded && (
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
            {this.renderSideSheet()}
          </Dashboard>
        )}
      />
    );
  }
}

export default TruckList;
