

export default class PayloadBuilder {
  private payload: Payload = {}

  setUserID(user_id: number) {
    this.payload.user_id = user_id
    return this
  }

  setEmail(email: string) {
    this.payload.email = email
    return this
  }

  setSubject(subject: string) {
    this.payload.subject = subject
    return this
  }

  setName(name: string) {
    this.payload.name = name
    return this
  }

  setPhoneNumber(phone_number: string) {
    this.payload.phone_number = phone_number
    return this
  }

  setMessage(message: string) {
    this.payload.message = message
    return this
  }

  setType(type: string) {
    this.payload.type = type
    return this
  }

  setDynamicTemplate(dynamic_template: { [key: string]: any }) {
    this.payload.dynamic_template = dynamic_template
    return this
  }

  build() {
    return this.payload
  }
}