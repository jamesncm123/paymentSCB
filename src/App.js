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
  payment = async()=>{

  
      var myHeaders = new Headers();
      myHeaders.append("requestUId", "d7e992f3-c9f1-4071-8a4a-6c5839c8d317");
      myHeaders.append("resourceOwnerId", "l7a0bed42f65814e82a1ca23ab8eda0e88");
      myHeaders.append("Access-Control-Allow-Headers", "requestUId,resourceOwnerId");
      myHeaders.append("Content-Type", "application/json");
     
      
      var raw = JSON.stringify({"applicationKey":"l7a0bed42f65814e82a1ca23ab8eda0e88","applicationSecret":"b777b20368df4cdf96fba31663cabb02"});
      

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      

      
      fetch("http://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
        if(result.status.code === 1000){
          var myHeaders = new Headers();

              myHeaders.append("resourceOwnerId", "l7a0bed42f65814e82a1ca23ab8eda0e88");
              myHeaders.append("Access-Control-Allow-Headers", "ResourceOwnerId,RequestUId");
              myHeaders.append("Authorization", "Bearer "+(result.data.accessToken));
              myHeaders.append("ResourceOwnerId", "l7a0bed42f65814e82a1ca23ab8eda0e88");
              myHeaders.append("RequestUId", "d7e992f3-c9f1-4071-8a4a-6c5839c8d317");
              myHeaders.append("Channel", "scbeasy");
              myHeaders.append("Content-Type", "application/json");


              var raw = JSON.stringify({"transactionType":"PURCHASE","transactionSubType":["BP","CCFA"],"billPayment":{"paymentAmount":1000,"accountTo":"796764438539448","ref1":"123123","ref2":"456456","ref3":"SCB"},"creditCardFullAmount":{"merchantId":"382574431459828","terminalId":"603988442999576","orderReference":"AA11011","paymentAmount":1000}});

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

              fetch("https://api-sandbox.partners.scb/partners/sandbox/v3/deeplink/transactions", requestOptions)
                .then(responses => responses.json())
                .then(results => {console.log(results)
                this.setState({url:results.data.deeplinkUrl})
                })
                .catch(error => console.log('error', error));
        }
        })
        .catch(error => console.log('error', error));

  }
  render() {
    return (
      <div style={{alignContent:"center"}}>

      <button onClick={this.payment}>CLICK PAYMANT</button>
      <h1>{this.state.url}</h1>
        {
          this.state.url &&(
            <QRCode
        value={this.state.url}
    size={256}
         />
          )
        }
        
      </div>

    )
  }
}
