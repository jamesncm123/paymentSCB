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
    fetch('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',{
      method:"POST",
      headers:{
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
        'requestUId': 'd7e992f3-c9f1-4071-8a4a-6c5839c8d317',
        'resourceOwnerId': 'l7a0bed42f65814e82a1ca23ab8eda0e88'
      },
      body: {
        "applicationKey" : "l7a0bed42f65814e82a1ca23ab8eda0e88",
        "applicationSecret" : "b777b20368df4cdf96fba31663cabb02"
     }
    }).then(response=>{
      console.log(response)
      if(response.status.code === 1000){
        fetch('https://api-sandbox.partners.scb/partners/sandbox/v2/deeplink/transactions',{
          method:"POST",
          headers:{
            'Access-Control-Allow-Headers': '*',
            'authorization': 'Bearer '+ response.data.accessToken,
            'resourceOwnerId': 'l7a0bed42f65814e82a1ca23ab8eda0e88',
            'requestUId':'d7e992f3-c9f1-4071-8a4a-6c5839c8d317',
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
