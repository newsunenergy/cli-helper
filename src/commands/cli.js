const command = {
  name: 'cli',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Quem é o rei da selva?')
  },
}

module.exports = command
