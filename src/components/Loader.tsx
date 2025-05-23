export const Loader = ({ loadingText } : { loadingText?: string }) => {
  return (
  <div className='flex flex-col gap-3'>
    <span className="loader"></span>
    <p>{loadingText ?? 'Carregando'}</p>
  </div>
  )
}