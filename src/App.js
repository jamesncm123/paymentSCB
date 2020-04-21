import React, { Component } from 'react'

import './App.css';
import QRCode from'qrcode.react';



export default class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      url:""
    }
  }
  payment(){
    const uid = (Math.random()).toString();
    console.log(uid)
    fetch('http://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',{
      method:"POST",
      headers:{
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'POST, GET, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type, Option, Authorization,resourceOwnerId,requestUId',
        'Content-Type': 'application/json',
        'resourceOwnerId': 'l7a0bed42f65814e82a1ca23ab8eda0e88',
        'requestUId': 'ajisodioajsdoasodijo123asdasd'
        
      },
      body: {
        "applicationKey" : "l7a0bed42f65814e82a1ca23ab8eda0e88",
        "applicationSecret" : "b777b20368df4cdf96fba31663cabb02"
     }
    }).then(response=>{
      console.log(response)
      if(response.status.code === 1000){
        fetch('http://api-sandbox.partners.scb/partners/sandbox/v2/deeplink/transactions',{
          method:"POST",
          headers:{
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods':'POST, GET, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':'Content-Type, Option, Authorization,resourceOwnerId,requestUId',
            'authorization': 'Bearer '+ response.data.accessToken,
            'resourceOwnerId': 'l7a0bed42f65814e82a1ca23ab8eda0e88',
            'requestUId':'ajisodioajsdoasodijo123asdasd',
            'channel':'scbeasy',
            'Content-Type': 'application/json'
          },
          body: {
            "paymentAmount": "100",
              "transactionType": "PAYMENT",
              "transactionSubType": "BPA",
              "ref1": "123123",
              "ref2": "12421123",
              "ref3": "SCB",
              "accountTo": "382574431459828"
          }
        }).then(res =>{
          console.log(res)
          if(res.status.code === 1000){
            this.setState({url:res.data.deeplinkUrl})
          }
        })
      }
      
    }).catch(err=>console.log(err))
    
  }
  render() {
    return (
      <div>

      <button onClick={this.payment}>CLICK PAYMANT</button>
      <h1>{this.state.url}</h1>
        <QRCode
        value={this.state.url}
    size={256}
         />
      </div>

    )
  }
}
