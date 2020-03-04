import useClients from './useClients'

const useOptimizers = () => {
  const [clients, sendMessage] = useClients()
  const optimizers = clients.filter(client => client.type === 'optimizer')
  return [optimizers, sendMessage]
}

export default useOptimizers
