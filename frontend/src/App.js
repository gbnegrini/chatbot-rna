import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import "bootswatch/dist/flatly/bootstrap.min.css";
import './App.css';
import api from './api.js'

class App extends Component {

    constructor() {
      super();
      this.state = {
        messageList: [],
        msgNumber: 0
      };
    }

    componentDidMount(){
        this._sendMessage('Olá, eu sou a Hebbie Ann! Qual é o seu nome?');
        this.setState({msgNumber:1});
    }

    async _onMessageWasSent(message) {
        this.setState({msgNumber:0});
        this.setState((state, props) => {
            return {
                messageList: [
                    ...state.messageList,
                    message,
                ]
            };
        });

        const response = await api.get('/aiml', {
            params:{
                question:message.data.text
            }
        });

        this._sendMessage(response.data.text);
    }

    _sendMessage(text) {
      if (text.length > 0) {
          this.setState((state, props) => {
              return {
                  messageList: [...state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                  }]
              };
          });
      }
    }

    render() {
      return (
          <React.Fragment>
            <div className='container'>
                <div className="jumbotron">
                <div className="jumbo-title">
                    <h1 className="display-3">Hebbie Ann</h1>
                    <div className="img-wrapper">
                        <img src="https://i.ibb.co/5K9C4wq/icon-96x96.png" className="img-fluid" alt="hebbie" width="72" height="72"></img>
                    </div>
                </div>

                  <p className="lead">Chatbot para interação sobre tópicos em Redes Neurais Artificiais (RNAs)</p>
                  <hr className="my-4"></hr>
                  <p>Desenvolvido por Guilherme Negrini, Júlio Schroder, Lucas Pacheco e Rodrigo Seger </p>
                </div>

                <div>
                    <Launcher
                      agentProfile={{
                        teamName: 'Hebbie Ann',
                        imageUrl: 'https://i.ibb.co/kXkZzcs/robo-4.png'
                      }}
                      onMessageWasSent={this._onMessageWasSent.bind(this)}
                      messageList={this.state.messageList}
                      showEmoji={false}
                      newMessagesCount={this.state.msgNumber}
                    />
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default App;
