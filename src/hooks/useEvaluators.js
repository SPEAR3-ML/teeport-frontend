import useClients from './useClients'

const useEvaluators = () => {
  const [clients, sendMessage] = useClients()
  const evaluators = clients.filter(client => client.type === 'evaluator')
  return [evaluators, sendMessage]
}

export default useEvaluators
