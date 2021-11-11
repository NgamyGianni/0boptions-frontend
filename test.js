import React, { Component } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  async componentWillMount() {
    /*var Web3 = require('web3');
    var url = 'https://ropsten.infura.io/v3/3a3ed447504a4cebb78fac1b12922674';
    var web3 = new Web3(url);
    var tmp = await window.ethereum.request({ method: 'eth_requestAccounts' });*/

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    var Contract = require('web3-eth-contract');
    //Contract.setProvider(tmp);
    var address = window.ethereum.selectedAddress;
    var contractAddress = '0xfcD79e8D2B06914DeFf37cebD232e9E2116f7820';
    var abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"}],"name":"currentMatchIsStarting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getGame","outputs":[{"components":[{"internalType":"uint256","name":"fees","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"nbPools","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"winnerPool","type":"uint256"},{"internalType":"bool","name":"joinLocked","type":"bool"},{"internalType":"bool","name":"rewardLocked","type":"bool"}],"internalType":"struct GameFactory.Game","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_nbPools","type":"uint256"}],"name":"initGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"uint256","name":"poolChoix","type":"uint256"}],"name":"join","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"nbPlayers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address payable","name":"_address","type":"address"}],"name":"reward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"uint256","name":"_winnerPool","type":"uint256"}],"name":"updateWinnerPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"poolChoice","type":"uint256"}],"stateMutability":"view","type":"function"}];
    var contract = new web3.eth.Contract(abi, contractAddress);
    var transact = await contract.methods.getGame(0).call({from:address});
    var balance = await web3.eth.getBalance(address)
    var currentNetwork = await web3.eth.net.getNetworkType();
    //var transact = await contract.methods.initGame("testWeb3Js", 3).send({from:"0xed1dc4d119c3bd916970fb81f3095a2f55262204"});
    console.log(web3.utils.fromWei(String(parseInt(transact['fees']['_hex'], 16))), 'ether'); // convert BigNumbers (hexa) into int
    console.log(transact);
    console.log(currentNetwork);
    console.log(web3.utils.fromWei(balance, 'ether'));
  }

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        <Button variant="primary" onClick = {()=>{
          window.ethereum.request({ method: 'eth_requestAccounts' })
      }}>Connect to metamask</Button>
        <Card style={{ marginTop: '10%', width: '40%', marginLeft: '30%' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>Game - soccer</Card.Title>
            <Card.Text style={{ textAlign: 'center' }}>
              LDC Game : PSG vs Man Utd
            </Card.Text>
            <Container>
              <Row>
                <Col>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label style={{ marginLeft: '25%' }}>PSG win</Form.Label>
                      <Form.Control type="email" placeholder="Enter amount" />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label style={{ marginLeft: '35%' }}>Draw</Form.Label>
                      <Form.Control type="email" placeholder="Enter amount" />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label style={{ marginLeft: '18%' }}>Man Utd win</Form.Label>
                      <Form.Control type="email" placeholder="Enter amount" />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
            <Button variant="primary" style={{ marginLeft: '45%'}}>Play</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
