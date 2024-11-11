In the documentation at https://developers.cloudflare.com/kv/get-started/
the "Copy" text uses <> angle brackets to mark the name of the binding,
but the guide its self says to name the namespace BINDING_NAME
This makes it so that copying the text provided produces an error.
<!-- eg: "npx wrangler kv key put --namespace-id=<BINDING_ID> "<KEY>" "<VALUE>" -->
<!-- Output: zsh: no such file or directory: BINDING_NAME -->
use this: "npx wrangler kv key put --namespace-id=BINDING_NAME "<KEY>" "<VALUE>"
(Remove the Angle Brackets)

Use --text to show the value retrived from wrangler kv key get
eg:  npx wrangler kv key get --binding=BINDING_NAME "<KEY>" --text
