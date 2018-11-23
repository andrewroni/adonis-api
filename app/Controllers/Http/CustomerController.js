'use strict'
const Customer = use('App/Models/Customer')

class CustomerController {
  async index({ response }) {
    const customers = await Customer.all()

    response.status(200).json({
      message: 'Here are your customers.',
      data: customers
    })
  }

  async store({ request, response }) {
    response.status(201).json({
      message: 'Successfully created a new customer.',
      data: await Customer.create(request.post())
    })
  }

  async show({ request, response }) {
    console.log(request.post());
    response.status(200).json({
      message: 'Here is your customer.',
      data: request.customer
    })
  }

  async update({ request, response }) {
    const { name, description } = request.post()

    request.customer.name = name
    request.customer.description = description

    request.customer.save()

    response.status(200).json({
      message: 'Customer was updated.',
      customer: request.customer
    })

  }

  async delete({ request, response, params: { id } }) {
    await request.customer.delete()

    response.status(200).json({
      message: 'Successfully deleted this customer.',
      id
    })
  }
}

module.exports = CustomerController
