'use strict';
const Bill = use('App/Models/Bill');
const Reply = use('App/Models/Reply');

class BillController {
  async bill({ request, auth, response }) {
    const user = auth.current.user;

    const bill = await Bill.create({
      user_id: user.id,
      bill: request.input('bill')
    });

    await bill.loadMany(['user', 'favourites', 'replies']);

    return response.json({
      status: 'success',
      message: 'Bill posted!',
      data: bill
    });
  }

  async show({ params, response }) {
    try {
      const bill = await Bill.query()
        .where('id', params.id)
        .with('user')
        .with('replies')
        .with('replies.user')
        .with('favourites')
        .firstOrFail();

      return response.json({
        status: 'success',
        data: bill
      });
    } catch (error) {
      return response.status(404).json({
        status: 'error',
        message: 'Bill not found'
      });
    }
  }

  async reply({ request, auth, params, response }) {
    const user = auth.current.user;
    const bill = await Bill.find(params.id);
    console.log(bill.id);
    const reply = await Reply.create({
      user_id: user.id,
      bill_id: bill.id,
      reply: request.input('reply')
    });

    await reply.load('user');

    return response.json({
      status: 'success',
      message: 'Reply posted!',
      data: reply
    });
  }

  async destroy({ request, auth, params, response }) {
    const user = auth.current.user;
    const bill = await Bill.query()
      .where('user_id', user.id)
      .where('id', params.id)
      .firstOrFail();

    await bill.delete();

    return response.json({
      status: 'success',
      message: 'Bill deleted!',
      data: null
    });
  }
}

module.exports = BillController;
