import useClients from './useClients'

const useAlgorithms = () => {
  const [clients, sendMessage] = useClients()
  const algorithms = clients.filter(client => client.type === 'algorithm')
  return [algorithms, sendMessage]
}

export default useAlgorithms
