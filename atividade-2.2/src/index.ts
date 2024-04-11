import ConversorController from './controllers/conversorController'
import ConversorPresenter from './presenter/conversorPresenter'

function inicia(): void {
  const conversorController = new ConversorController()
  const conversorPresenter = new ConversorPresenter(conversorController)
  conversorPresenter.run().then(r => { }).catch(e => { })
}

inicia()
