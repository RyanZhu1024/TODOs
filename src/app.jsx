var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://amber-fire-6772.firebaseio.com/';

var App = React.createClass({
    mixins: [ReactFire],
    componentWillMount: function(){
        this.bindAsObject(new Firebase(rootUrl + 'items/'),'item');
    },
    render: function() {
        console.log(this.state);
        return <h1 className="red">
            App! React!
        </h1>
    }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
