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

  async show({ request, response, params: { id } }) {
    const customer = await Customer.find(id)

    if (customer) {
      response.status(200).json({
        message: 'Here is your customer.',
        data: customer
      })
    } else {
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
}

  async update({ request, response, params: { id } }) {

    const customer = await Customer.find(id)
    if (customer) {
      const { name, description } = request.post()

      customer.name = name
      customer.description = description

      await customer.save()

      response.status(200).json({
        message: 'Customer was successfuly updated.',
        data: customer
      })

    } else {
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }

  async delete({ request, response, params: { id } }) {
    const customer = await Customer.find(id)
    if (customer) {

      await customer.delete()

      response.status(200).json({
        message: 'Successfully deleted this customer.',
        id
      })

    } else {
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }
}

module.exports = CustomerController
