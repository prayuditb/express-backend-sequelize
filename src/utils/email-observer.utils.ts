import axios, { AxiosInstance } from "axios"

type Personalizations = {
  to: {
    email: string
    name: string
  }
  dynamic_template_data: {
    [key: string]: any
  }
  subject: string
}

type EmailPayload = {
  personalizations?: Personalizations[]
  from?: {
    email: string
    name: string
  }
  template_id?: string
}

/**
 * Payload builder for send email to sengrid API
 */
export class EmailBuilder {
  private data: EmailPayload = {
    personalizations: []
  }

  addPersonalization(to_email: string, to_name: string, subject: string, dynamic_template: { [key: string]: any }) {
    this.data.personalizations.push({
      to: { email: to_email, name: to_name },
      dynamic_template_data: dynamic_template,
      subject
    })
    return this
  }
  setFrom(email: string, name: string) {
    this.data.from = { email, name }
    return this
  }
  setTemplateID(id: string) {
    this.data.template_id = id
    return this
  }
  build() {
    return this.data
  }
}


export class EmailObserver implements Observer {
  private payload: Payload
  // use dependency injection
  constructor(private client: AxiosInstance) {}

  // send email
  update(payload: Payload) {
    if (!payload.email) {
      console.warn("Observer Payload invalid: email is required | ", payload)
      return
    }
    const builder = new EmailBuilder()
      .setFrom("btechno.asia@gmail.com", "beTechno")
      .addPersonalization(payload.email, payload.name, payload.subject, payload.dynamic_template)

    switch (payload.type) {
      case "forgot_password": builder.setTemplateID(process.env.SENDGRID_TEMPLATE_FORGOT_PASSWORD)
        break;
      case "verify_email": builder.setTemplateID(process.env.SENDGRID_TEMPLATE_VERIFY_EMAIL)
        break;
    }

    this.payload = builder.build()
    this.send()
  }

  async send() {
    try {
      const res = await this.client.post("/mail/send", this.payload)
      if (process.env.NODE_ENV !== "production") console.log("Email sent to: ", this.payload.email)
    } catch (err) {
      console.warn(`failed to send email to ${this.payload.email}: ${err.message}`)
    }
  }
}

const client: AxiosInstance = axios.create({
  baseURL: process.env.SENDGRID_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
  }
})

const emailObserver = new EmailObserver(client)

export default emailObserver