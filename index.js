'use strict';

var React = require('react');
var R = React.DOM;
var hb = require('handlebars');

var template = '<b>Hello, {{name}}.</b>';

var Greeting = React.createClass({

  componentWillMount: function () {
    this.pickRandomName();
    this.timer = setInterval(function () {
      this.pickRandomName();
    }.bind(this), 1000);
  },

  componentWillUnmount: function () {
    clearTimeout(this.timer);
  },

  pickRandomName: function () {
    var nameIndex = Math.floor(Math.random() * this.props.names.length);
    this.setState({name: this.props.names[nameIndex]});
  },

  templateFn: hb.compile(template),

  render: function () {
    var output = this.templateFn(this.state);
    return R.span({dangerouslySetInnerHTML:{__html: output}});
  }

});

React.renderComponent(Greeting({names: ['Joe', 'Steve', 'Mary', 'Jane']}), document.body);
