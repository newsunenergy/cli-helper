const { capitalize } = require('../utils/capitalize')

module.exports = {
  name: 'new:project',
  alias: ['project'],
  run: async (toolbox) => {
    const { parameters, template, print, filesystem } = toolbox

    const { generate } = template
    const { info } = print

    const project = parameters.first?.toLowerCase()

    if (!project) {
      return info('expected argument')
    }


    const module = "user"
    const Module = "User"
    const Repository = Module + 'Repository'
    const repository = Module + 'Repository'
    const Implementation = 'Prisma' + Repository
    const implementation = 'Prisma' + Repository
    const BaseEntity = 'BaseEntity' + Module

    await filesystem.dir(`./${project}/src/modules/${module}`)
    await filesystem.dir(`./${project}/src/modules/${module}/entities`)
    await filesystem.dir(`./${project}/src/modules/${module}/useCase`)
    await filesystem.dir(`./${project}/src/modules/${module}/repositories/implementation`)

    await filesystem.dir(`./${project}/src/shared/infra/http/config`)
    await filesystem.dir(`./${project}/src/shared/infra/http/middleware`)
    await filesystem.dir(`./${project}/src/shared/infra/http/routes`)

    await filesystem.dir(`./${project}/src/core/base`)
    await filesystem.dir(`./${project}/src/core/errors`)

    await filesystem.dir(`./${project}/src/shared/infra/prisma`)

    const UseCase = "CreateUser"
    const useCase = "CreateUser"



    const Controller = UseCase + 'Controller'
    const controller = useCase.charAt(0).toLowerCase() + ((useCase) + 'Controller').slice(1)
    const Service = UseCase + 'Service'
    const DTO = UseCase + 'DTO'
    const Validation = UseCase + 'Validation'

    const props = {
      module,
      Module,
      BaseEntity,
      Repository, 
      repository,
      Implementation ,
      implementation,
      BaseEntity,
      project,
      Controller,
      controller,
      Validation,
      DTO,
      Service
    }


    generate({
      template: 'corebaseEntity.ejs',
      target: `./${project}/src/core/base/BaseEntity.ts`,
      props,
    })

    generate({
      template: 'corebaseException.ejs',
      target: `./${project}/src/core/base/BaseException.ts`,
      props,
    })
    generate({
      template: 'AuthenticationException.ejs',
      target: `./${project}/src/core/errors/AuthenticationException.ts`,
      props,
    })
    generate({
      template: 'InvalidQueryException.ejs',
      target: `./${project}/src/core/errors/InvalidQueryException.ts`,
      props,
    })
    generate({
      template: 'ValidationException.ejs',
      target: `./${project}/src/core/errors/ValidationException.ts`,
      props,
    })
    generate({
      template: 'QueryNotFound.ejs',
      target: `./${project}/src/core/errors/QueryNotFound.ts`,
      props,
    })
    generate({
      template: 'coreError.ejs',
      target: `./${project}/src/core/errors/index.ts`,
      props,
    })





    generate({
      template: 'env.ejs',
      target: `./${project}/.env`,
      props: props
    })

    generate({
      template: 'gitignore.ejs',
      target: `./${project}/.gitignore`,
      props: props
    })

    generate({
      template: 'package.ejs',
      target: `./${project}/package.json`,
      props: props
    })
    generate({
      template: 'jestconfig.ejs',
      target: `./${project}/jest.config.ts`,
      props: props
    })
    generate({
      template: 'tsconfig.ejs',
      target: `./${project}/tsconfig.json`,
      props: props
    })




    generate({
      template: 'app.ejs',
      target: `./${project}/src/shared/infra/http/app.ts`,
      props,
    })

    generate({
      template: 'httpConfig.ejs',
      target: `./${project}/src/shared/infra/http/config/httpConfig.ts`,
      props,
    })
    generate({
      template: 'defaultRoutes.ejs',
      target: `./${project}/src/shared/infra/http/routes/index.ts`,
      props,
    })
    generate({
      template: 'userRoutes.ejs',
      target: `./${project}/src/shared/infra/http/routes/user.routes.ts`,
      props,
    })


    generate({
      template: 'schemaPrisma.ejs',
      target: `./${project}/src/shared/infra/prisma/schema.prisma`,
      props,
    })
    generate({
      template: 'clientPrisma.ejs',
      target: `./${project}/src/shared/infra/prisma/client.ts`,
      props,
    })






    generate({
      template: 'controller.ejs',
      target: `./${project}/src/modules/${module}/useCase/${useCase}/${Controller}.ts`,
      props,
    })
    generate({
      template: 'index.ejs',
      target: `./${project}/src/modules/${module}/useCase/${useCase}/index.ts`,
      props,
    })

    generate({
      template: 'service.ejs',
      target: `./${project}/src/modules/${module}/useCase/${useCase}/${Service}.ts`,
      props,
    })
    generate({
      template: 'validation.ejs',
      target: `./${project}/src/modules/${module}/useCase/${useCase}/${Validation}.ts`,
      props,
    })
    generate({
      template: 'dto.ejs',
      target: `./${project}/src/modules/${module}/useCase/${useCase}/${DTO}.ts`,
      props,
    })

    generate({
      template: 'entities.ejs',
      target: `./${project}/src/modules/${module}/entities/${Module}.ts`,
      props: props
    })
    generate({
      template: 'baseentities.ejs',
      target: `./${project}/src/modules/${module}/entities/${BaseEntity}.ts`,
      props: props,
    })

    generate({
      template: 'implementations.ejs',
      target: `./${project}/src/modules/${module}/repositories/implementation/${Implementation}.ts`,
      props: props,
    })
    info(`wait seconds...`)
    await generate({
      template: 'repository.ejs',
      target: `./${project}/src/modules/${module}/repositories/${Repository}.ts`,
      props: props,
    })

    info(`Executando yarn install...`)
   
    setTimeout(async () => {
      await toolbox.system.run(`cd ${project} && yarn install`)
      info(`OK...`)
    }, 500);
  
  },
}
