import useClients from './useClients'

const useProcessors = () => {
  const [clients, sendMessage] = useClients()
  const processors = clients.filter(client => client.type === 'processor')
  return [processors, sendMessage]
}

export default useProcessors
