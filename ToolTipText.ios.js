'use strict';

import React from 'react';
import ReactNative, {
  requireNativeComponent,
  NativeModules,
  TouchableHighlight,
  View,
} from 'react-native';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const ToolTipMenu = NativeModules.ToolTipMenu;
const RCTToolTipText = requireNativeComponent('RCTToolTipText', null);

const ViewClass = createReactClass({

  propTypes: {
    actions: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        command: PropTypes.string.isRequired,
        })),
    onActionSelected: PropTypes.func.isRequired,
    longPress: PropTypes.bool,
    ...TouchableHighlight.propTypes,
  },

  showToolTipMenu: function() {
    if (this.props.showMenuToTheLeft) {
      ToolTipMenu.show(ReactNative.findNodeHandle(this.refs.toolTipText), this.getActionTexts(), true);
    } else {
      ToolTipMenu.show(ReactNative.findNodeHandle(this.refs.toolTipText), this.getActionTexts(), false);
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
