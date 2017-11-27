import React, { Component } from 'react';
import { WebView } from 'react-native';
import { PropTypes } from 'prop-types';

class PlaidAuthenticator extends Component {
  render() {
    const {publicKey, selectAccount, env, product, clientName, webhook, style, token, injectedJavaScript} = this.props;

    let uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&webhook=${webhook}&selectAccount=${selectAccount}`
    uri = token !== undefined ? `${uri}&token=${token}` : uri

    return <WebView
      style={{...style}}
      source={{uri}}
      onMessage={(e) => this.onMessage(e)}
      injectedJavaScript={injectedJavaScript}
    />
  }

  onMessage(e) {
    /*
      Response example for success

      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */

    this.props.onMessage(JSON.parse(e.nativeEvent.data))
  }
}

PlaidAuthenticator.defaultProps = {
  publicKey: PropTypes.string.isRequired,
  onMessage: PropTypes.func.isRequired,
  env: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  webhook: PropTypes.string,
  style: PropTypes.object
}

PlaidAuthenticator.defaultProps = {
  clientName: 'CatalinMiron',
  webhook: 'http://batman.codes',
  style: {}
};

export default PlaidAuthenticator;
