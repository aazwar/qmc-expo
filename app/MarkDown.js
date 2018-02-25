import React from 'react';
import { Text } from 'react-native';

export default class MarkDown extends React.Component {
  render() {
    let fragments = this.props.children.match(/([^_\*]+)|(_.+?_)|(\*.+?\*)/g);
    if (fragments.length == 1 && !fragments[0].match(/^(_|\*)/)) {
      return (
        <Text {...this.props}>
          {fragments[0]}
        </Text>
      );
    } else {
      return (
        <Text {...this.props}>
          {fragments.map((t, i) => {
            switch (t[0]) {
              case '_':
                return (
                  <Text key={i} style={{ fontStyle: 'italic' }}>
                    {t.slice(1, -1)}
                  </Text>
                );
                break;
              case '*':
                return (
                  <Text key={i} style={{ fontFamily: 'medula-one', fontSize: 24 }}>
                    {t.slice(1, -1)}
                  </Text>
                );
                break;
              default:
                return (
                  <Text key={i}>
                    {t}
                  </Text>
                );
            }
          })}
        </Text>
      );
    }
    if (this.props.children.match(/_|\*/)) {
      const patt = /_|\*/;
      let type;
    } else {
      return (
        <Text {...this.props}>
          {this.props.children}
        </Text>
      );
    }
  }
}
