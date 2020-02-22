import useClients from './useClients'

const useAlgorithms = () => {
  const [clients, sendMessage] = useClients()
  return [clients, sendMessage]
}

export default useAlgorithms
