'use strict';

var React = require('react-native');
var {
  requireNativeComponent,
  TouchableHighlight,
  View
} = React;

var ToolTipMenu = React.NativeModules.ToolTipMenu;
var RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

var ViewClass = React.createClass({

  propTypes: {
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        command: React.PropTypes.string.isRequired,
        })),
    onActionSelected: React.PropTypes.func.isRequired,
    longPress: React.PropTypes.bool,
    ...TouchableHighlight.propTypes,
  },

  showToolTipMenu: function() {
    if (this.props.showMenuToTheLeft) {
      ToolTipMenu.show(React.findNodeHandle(this.refs.toolTipText), this.getActionTexts(), true);
    } else {
      ToolTipMenu.show(React.findNodeHandle(this.refs.toolTipText), this.getActionTexts(), false);
    }
  },

  onToolTipActionSelected: function(event: Event) {
    var actionCommand = this.getActionCommand(event.nativeEvent.text);

    if (this.props.onActionSelected) {
      this.props.onActionSelected(actionCommand);
    }
  },

  getActionTexts: function() {
    return this.props.actions.map((action) => action.text);
  },

  getActionCommand: function(actionText) {
    var selectedOption = this.props.actions.find((action) => action.text === actionText);

    if (selectedOption) {
      return selectedOption.command;
    }

    return null;
  },

  getTouchableHighlightProps: function() {
    var props = {};

    Object.keys(TouchableHighlight.propTypes).forEach((key) => props[key] = this.props[key]);

    if (this.props.longPress) {
      props.onLongPress = this.showToolTipMenu;
    } else {
      props.onPress = this.showToolTipMenu;
    }

    // Override the style for the touchable highlight to fill the size of the tooltip container.
    props.style = {
        flex: 1,
        alignSelf: 'stretch'
    };

    return props;
  },

  render: function() {
    return (
      <RCTToolTipText ref='toolTipText' onChange={this.onToolTipActionSelected} style={this.props.style}>
        <TouchableHighlight {...this.getTouchableHighlightProps()}>
          <View>
            {this.props.children}
          </View>
        </TouchableHighlight>
      </RCTToolTipText>
    );
  }
});

module.exports = ViewClass;
