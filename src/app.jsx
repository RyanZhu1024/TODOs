var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list')
var rootUrl = 'https://amber-fire-6772.firebaseio.com/';

var App = React.createClass({
    getInitialState: function () {
        return {
            items:{},
            loaded: false
        }
    },
    mixins: [ReactFire],
    componentWillMount: function(){
        this.fb=new Firebase(rootUrl + 'items/');
        this.bindAsObject(this.fb,'items');
        this.fb.on('value',this.handleDataLoaded);
    },
    render: function() {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                    To-Do List
                </h2>
                <Header itemStore={this.firebaseRefs.items}/>
                <hr/>
                <div className={"content " + (this.state.loaded? 'loaded':'')}>
                    <List items={this.state.items} />
                    {this.deleteButton()}
                </div>
            </div>
        </div>
    },
    handleDataLoaded: function(){
        this.setState({loaded: true});
    },
    deleteButton:function(){
        if(!this.state.loaded){
            return;
        }else{
            return <div className="text-center clear-complete">
                <hr />
                <button
                    type="button"
                    onClick={this.onDeleteDoneClick}
                    className="btn btn-default">
                    Clear Complete
                </button>
            </div>
        }
    },
    onDeleteDoneClick: function(){
        for (var key in this.state.items) {
            if (this.state.items[key].done===true) {
                this.fb.child(key).remove();
            }
        }
    }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
