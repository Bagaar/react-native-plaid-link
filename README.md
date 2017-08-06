### React Native Plaid Authenticator

Since [Plaid.com](https://plaid.com/) doesn't have support for React Native and a lot o devs [asked](https://github.com/plaid/link/issues/153) for an implementation, I've built this lib that adds support for [Plaid](https://plaid.com/) authentication using a [Webview](https://plaid.com/docs/quickstart/#webview-integration) and [Plaid Link](https://blog.plaid.com/announcing-a-new-mobile-experience-for-link/)


### Usage

#### API

|Prop|Type|defaultValue|
|----|----|----|
|__publicKey__ (required)|`string`|  |
|__onMessage__ (required)| `function`||
|__env__ (required)|`string`|  |
|__product__ (required)|`string`|  |
|clientName|`string`|  |
|webhook|`string`| `http://batman.codes`|
|style|`object`| `{}`|

```js
render() {
  return <PlaidAuthenticator
    onMessage={this.onMessage}
    publicKey="YOUR_PLAID_PUBLIC_KEY"
    env="sandbox"
    product="auth,transactions"
    clientName="Catalin Miron"
  />
}

onMessage = (data) => {
  this.setState({data})
}
```

##### Returned **data** object

```json
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
```

For more information please [read their docs](https://plaid.com/docs/quickstart/#accessing-item-data)


[Type of actions](https://plaid.com/docs/api/#onexit-callback):

|Status|Description|
|----|----|
|connected|	User completed the Link flow|
|requires_questions|User prompted to answer security question(s)|
|requires_selections|	User prompted to answer multiple choice question(s)|
|requires_code|	User prompted to provide a one-time passcode|
|choose_device|	User prompted to select a device on which to receive a one-time passcode|
|requires_credentials|	User prompted to provide credentials for the selected financial institution or has not yet selected a financial institution|
|institution_not_found|	User exited the Link flow after unsuccessfully (no results returned) searching for a financial institution|


For `Sandbox mode` the credentials are:
```
username: user_good
password: pass_good
```

#### Get your plaid API key

- Go to [Plaid dashboard](https://dashboard.plaid.com/signin) and `Sign in`.
- Add Plaid to your app
- Copy your Plaid __public_key__


#### Questions?

Feel free to contact me:

Twitter: [@mironcatalin](http://twitter.com)
Website: [http://batman.codes](http://batman.codes)