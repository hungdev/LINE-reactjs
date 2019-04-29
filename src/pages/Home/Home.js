import React from 'react';
import Helmet from 'react-helmet';
import { Heading, Button, Card, Small, toaster } from 'evergreen-ui';
import Box from 'ui-box';
import './Home.scss';
import Dashboard from '../../containers/Dashboard';
import Auth from '../../containers/Auth';

const menuItems = [
  { id: 'truck', title: 'Truck', subtitle: 'Search, create new or edit existing trucks', icon: require('../../assets/icon-truck.png') },
  { id: 'taxi', title: 'Taxi', subtitle: 'Search, create new or edit existing taxi', icon: require('../../assets/taxi.png') },
  { id: 'tractor', title: 'Tractor', subtitle: 'Search, create new or edit existing tractors', icon: require('../../assets/tractor.png') },
  { id: 'driver', title: 'Driver', subtitle: 'Search, create new or edit existing drivers', icon: require('../../assets/driver.png') },
];

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.menuSelected = this.menuSelected.bind(this);
  }

  menuSelected(item) {
    switch (item) {
      case 'truck':
        this.props.history.push('/trucks');
        break;
      default:
        toaster.warning(`Menu for ${item} is not implemented yet`);
    }
  }

  render() {
    return (
      <Dashboard>
        <Helmet>
          <title>Homepage</title>
        </Helmet>
        <Box height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Box className="home">
            <Auth guest={() => (
              <React.Fragment>
                <Heading size={900} color="#FFFFFF">Truck Management Dashboard</Heading>
                <Heading marginTop={8} marginBottom={8}>Please login to continue</Heading>
                <Button marginRight={12} appearance="primary" intent="success" onClick={() => this.props.history.push('/register')}>Register</Button>
                <Button appearance="primary" onClick={() => this.props.history.push('/login')}>Login</Button>
              </React.Fragment>
            )} auth={() => (
              <React.Fragment>
                <Heading marginTop={8} marginBottom={32} size={900} color="#FFFFFF">Dashboard</Heading>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                  {
                    menuItems.map(({ id, title, icon, subtitle }, i) => (
                      <Card
                        key={i}
                        backgroundColor="white"
                        elevation={0}
                        color="#000000"
                        width="calc(50% - 8px)"
                        boxSizing="border-box"
                        padding="16px"
                        margin="4px"
                        textAlign="left"
                        cursor="pointer"
                        onClick={() => this.menuSelected(id)}>
                        <Box is="img" src={icon} float="right" width="64px" height="64px" marginLeft="8px"/>
                        <Heading fontSize="14pt">{title}</Heading>
                        <Small color="#888888" fontSize="8pt">{subtitle}</Small>
                      </Card>
                    ))
                  }
                </Box>
              </React.Fragment>
            )}/>
          </Box>
        </Box>
      </Dashboard>
    );
  }
}

export default Home;
