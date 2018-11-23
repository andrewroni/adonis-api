'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Customer = use('App/Models/Customer')

class FindCustomer {
  async handle({ request, response, params: { id } }, next) {


    // call next to advance the request
    const customer = await Customer.find(id)

    if (!customer) {
      return response.status(404).json({
        message: 'Customer not found.',
        id
      })
    }

    request.customer = customer
    console.log(request.body);



    await next()
  }
}

module.exports = FindCustomer
