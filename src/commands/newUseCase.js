const { capitalize } = require('../utils/capitalize')

module.exports = {
  name: 'new:usecase',
  alias: ['new:case'],
  run: async (toolbox) => {
    const { parameters, template, print, filesystem } = toolbox

    const { generate } = template
    const { info } = print

    const module = parameters.first?.toLowerCase()
    const useCase = parameters.second

    if (!module || !useCase) {
      return info('expected two arguments')
    }

    const Module = capitalize(parameters.first?.toLowerCase())
    const UseCase = capitalize(parameters.second)

    const Repository = Module + 'Repository'
    const repository = Module + 'Repository'
    const Implementation = 'Prisma' + Repository
    const implementation = 'Prisma' + Repository

    await filesystem.dir(`./src/modules/${module}/useCase/${useCase}`)

    const Controller = UseCase + 'Controller'
    const controller = useCase.charAt(0).toLowerCase() + ((useCase) + 'Controller').slice(1)
    const Service = UseCase + 'Service'
    const DTO = UseCase + 'DTO'
    const Validation = UseCase + 'Validation'

    const props = {
      Module,
      module,
      useCase,
      UseCase,
      Controller,
      controller,
      Repository,
      repository,
      Service,
      DTO,
      Validation,
      Implementation,
      implementation
    }

    generate({
      template: 'controller.ejs',
      target: `./src/modules/${module}/useCase/${useCase}/${Controller}.ts`,
      props,
    })
    generate({
      template: 'index.ejs',
      target: `./src/modules/${module}/useCase/${useCase}/index.ts`,
      props,
    })

    generate({
      template: 'service.ejs',
      target: `./src/modules/${module}/useCase/${useCase}/${Service}.ts`,
      props,
    })
    generate({
      template: 'validation.ejs',
      target: `./src/modules/${module}/useCase/${useCase}/${Validation}.ts`,
      props,
    })
    generate({
      template: 'dto.ejs',
      target: `./src/modules/${module}/useCase/${useCase}/${DTO}.ts`,
      props,
    })

    info(`Generated module ${module}`)
  },
}
