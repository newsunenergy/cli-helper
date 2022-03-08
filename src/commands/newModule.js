const { capitalize } = require('../utils/capitalize')

module.exports = {
  name: 'new:module',
  alias: ['model'],
  run: async (toolbox) => {
    const { parameters, template, print, filesystem } = toolbox

    const { generate } = template
    const { info } = print

    const module = parameters.first?.toLowerCase()

    if (!module) {
      return info('expected argument')
    }

    const Module = capitalize(parameters.first?.toLowerCase())
    const Repository = Module + 'Repository'
    const repository = Module + 'Repository'
    const Implementation = 'Prisma' + Repository
    const implementation = 'Prisma' + Repository
    const BaseEntity = 'BaseEntity' + Module

    await filesystem.dir(`./src/modules/${module}`)
    await filesystem.dir(`./src/modules/${module}/entities`)
    await filesystem.dir(`./src/modules/${module}/useCase`)
    await filesystem.dir(`./src/modules/${module}/repositories/implementation`)

    generate({
      template: 'entities.ejs',
      target: `./src/modules/${module}/entities/${Module}.ts`,
      props: {
        module,
        Module,
        BaseEntity
      },
    })
    generate({
      template: 'baseentities.ejs',
      target: `./src/modules/${module}/entities/${BaseEntity}.ts`,
      props: {
        module,
        Module,
        BaseEntity
      },
    })

    generate({
      template: 'implementations.ejs',
      target: `./src/modules/${module}/repositories/implementation/${Implementation}.ts`,
      props: {
        module,
        Module,
        Implementation,
        implementation,
        repository,
        Repository,
      },
    })
    generate({
      template: 'repository.ejs',
      target: `./src/modules/${module}/repositories/${Repository}.ts`,
      props: {
        module,
        Module,
        Repository,
        repository,
      },
    })

    info(`Generated module ${module}`)
  },
}
