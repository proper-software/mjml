## Use your MJML templates to send emails via meteor/emails

This package allows you to use your MJML templates when sending emails.

### How to install?

```
meteor add propersoftware:mjml
```

### How to use?

Package extends functionality of standard `meteor/email` package. See example:

```javascript
import { Email } from "meteor/email";
import "meteor/propersoftware:mjml";

Email.sendWithMjmlTemplate({
  showLogs: false, // true
  template: {
    name: "emails/welcome.mjml", // MJML file template located in private/ directory
    params: {
      name: "Hello!", // All dynamic properties to put into MJML template
    },
  },
  from: "john.doe@example.com",
  to: "customer@examplestartup.com",
  subject: "It works!",
});
```

File located in `private/emails` directory:

```mjml
<mjml>
  <mj-body background-color="#F4F4F4">
    <mj-section>
      <mj-column> <mj-text>Hi {{name}}!</mj-text></mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

and that's it!

### Roadmap

- [ ] add tests
- [ ] add examples
