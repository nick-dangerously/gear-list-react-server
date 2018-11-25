const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      id: 'tent',
      name: 'Big Agnes Copper Spur HV UL2',
      weight: '54',
      avatarURL: config.origin + '/BA-Copper-Spur-HV-UL2.jpg'
    },
    {
      id: 'sleepingBag',
      name: 'GoLite Ultra 20',
      weight: '17',
      avatarURL: config.origin + '/GoLite-Ultra-20.jpg'
    },
    {
      id: 'backpack',
      name: 'Hyperlite Mountain Gear Dyneema Summit Bag',
      weight: '15',
      avatarURL: config.origin + '/HMG-dyneema-summit-pack.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8)
  }

  get(token).contacts.push(contact)

  return contact
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
  }

  return { contact }
}

module.exports = {
  get,
  add,
  remove
}
