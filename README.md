# wit-chatbot
wit-chatbot used wit.ai as the brain to classify intents and entities. We have added greetings and pizza ordering as a capabilities to the chat bot. You can launch the app and communicate using browser chat window.

### Train your wit.ai server with greetings and pizza ordering examples

### Installation
wit-chatbot requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and start the server.

```sh
$ cd wit-chatbot/chat_server
$ [sudo] npm install 
$ cd ..
$ cd witSDK
$ [sudo] npm install 
```
Running Application...
Remember to include Open weather APP ID for weather method
```sh
$ [sudo] nano wit-chatbot/witSDK/methods/weather.js
```
Start Services 
```sh
$ ./services.sh
```
Start wit SDK Application
Add wit.ai server access key in witserver.sh
```sh
$ [sudo] nano wit-chatbot/witserver.sh
```
Run Application
$ ./witserver.sh
```
Now go to browser and call IP:PORT and you'll see login screen. Enter your name and now all the message you enter into chat text box will be processed by wit.ai and replies will be sent to the chat box.


