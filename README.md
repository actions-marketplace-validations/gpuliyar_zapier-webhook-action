# Call Zapier Webhook Action
Github Action to call Zapier Webhook (and post messages if needed). If a developer works with Zapier Zap Apps, then he/she can use this Github Action to call the Zap Webhook and post a payload as well.

## Inputs

Name | Description | Required
--- | --- | ---
`webhook-id` | Zapier Webhook ID https://hooks.zapier.com/hooks/catch/{webhook-id} | `true`
`method` | HTTP Request method - `GET`, `POST`, `PUT`. Default is `GET` | `false`
`silent` | If the developer prefers getting an empty response - (`true` or `false`). Default is `false` | `false`
`message` | Payload to send to the Zapier Webhook | `false`

## Outputs

Name | Description
--- | ---
`state` | HTTP response status of the Zapier webhook call

## Example Usage

```
jobs:
  call-zapier-webhook:
    runs-on: ubuntu-latest
    steps:
    - name: Call Zapier Webhook
        uses: gpuliyar/zapier-webhook-action@v1.0.0
        with:
          # Zapier Webhook ID https://hooks.zapier.com/hooks/catch/{webhook-id} (Mandatory)
          webhook-id: 100/abc

          # Webhook call Http method (Optional)
          # Allowed http method verbs - GET, POST, PUT
          # default - GET
          method: POST
 
          # If the developer prefers getting an empty response (Optional)
          # default - false (not silent)
          silent: false

          # Payload to send to the Zapier webhook (Optional)
          message: this action is awesome
```
