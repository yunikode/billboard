'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reply extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  bill () {
    return this.belongsTo('App/Models/Bill')
  }
}

module.exports = Reply
